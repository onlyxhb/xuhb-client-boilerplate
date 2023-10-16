import { resolve } from 'path'
import { defineConfig, bytecodePlugin } from 'electron-vite'

import { viteConfig } from './vite.config'

export default defineConfig({
  main: {
    plugins: [bytecodePlugin()],
    build: {
      lib: {
        entry: 'client/main/index.ts'
      },
      rollupOptions: {
        external: ['@electron-toolkit/utils']
      }
    }
  },
  preload: {
    plugins: [bytecodePlugin()],
    build: {
      lib: {
        entry: 'client/preload/index.ts'
      },
      rollupOptions: {
        external: ['@electron-toolkit/preload']
      }
    }
  },
  renderer: {
    root: resolve('./'),
    build: {
      rollupOptions: {
        input: {
          index: resolve('./index.html')
        }
      }
    },
    ...viteConfig
  }
})
