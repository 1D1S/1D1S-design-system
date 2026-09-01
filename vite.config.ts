import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import dts from 'vite-plugin-dts'

// 컴포넌트별 서브패스 진입점(@1d1s/design-system/Button)을 위해 각 컴포넌트의
// index.ts 를 개별 엔트리로 등록한다. 배럴(src/index.ts)이 닿지 않는 모듈
// (예: Icons/index.ts)도 이렇게 해야 dist 에 파일이 생긴다.
const componentsDir = path.resolve(__dirname, 'src/components')
const libEntries = [
  path.resolve(__dirname, 'src/index.ts'),
  path.resolve(__dirname, 'src/hooks/index.ts'),
  path.resolve(__dirname, 'src/lib/utils.ts'),
  ...fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        fs.existsSync(path.join(componentsDir, d.name, 'index.ts')),
    )
    .map((d) => path.join(componentsDir, d.name, 'index.ts')),
]

// dependencies 는 소비 앱에 어차피 설치되므로 번들에 인라인하지 않는다.
// 인라인하면 Button 하나만 import 해도 radix/date-fns 전체가 딸려와
// 트리셰이킹이 무의미해진다.
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'),
) as { dependencies: Record<string, string>; peerDependencies: Record<string, string> }
const externalPackages = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
]
const isExternal = (id: string) =>
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`))

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
      entry: libEntries,
      name: 'OdosDesignSystem',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        // 컴포넌트별로 파일을 쪼개 소비 앱 번들러가 실제로 트리셰이킹할 수 있게 한다.
        // src 구조를 그대로 dist 에 미러링 → dist/components/Button/index.js
        preserveModules: true,
        preserveModulesRoot: path.resolve(__dirname, 'src'),
        entryFileNames: '[name].js',
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
