import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import dts from 'vite-plugin-dts'

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
    })
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
