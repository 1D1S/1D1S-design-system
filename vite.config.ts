import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import dts from 'vite-plugin-dts'

// 거의 모든 컴포넌트가 'use client' 로 선언돼 있지만, 단일 파일로 번들링하면
// Rollup 이 모듈 레벨 디렉티브를 전부 제거한다("'use client' was ignored").
// 그 결과 dist/index.es.js 에는 디렉티브가 없어, 이 패키지를 RSC(서버
// 컴포넌트)에서 import 하면 번들 내부의 createContext 가 서버에서 평가되며
// `createContext is not a function` 으로 빌드가 깨진다.
// 번들 최상단에 'use client' 를 1회 주입해 라이브러리 전체를 클라이언트
// 모듈 경계로 만든다(렌더는 generateBundle 단계 = minify 이후이므로 항상
// 파일 맨 앞에 위치한다).
function injectUseClientDirective(): Plugin {
  return {
    name: 'inject-use-client-directive',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.fileName.endsWith('.js')) {
          continue
        }
        const hasDirective =
          chunk.code.startsWith("'use client'") ||
          chunk.code.startsWith('"use client"')
        if (!hasDirective) {
          chunk.code = `'use client';\n${chunk.code}`
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: [
        'src/**/*.stories.*',
        'src/**/*.test.*',
        'src/**/*.spec.*',
      ],
    }),
    injectUseClientDirective(),
  ],
  esbuild: {
    legalComments: 'none',
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        ecma: 2020,
        pure_getters: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        booleans_as_integers: false,
        drop_console: false,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    cssCodeSplit: false,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'OdosDesignSystem',
      formats: ['es'],
      fileName: () => 'index.es.js',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^next($|\/)/,
        'lucide-react',
      ],
      output: {
        compact: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
