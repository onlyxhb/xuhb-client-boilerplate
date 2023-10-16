import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from 'autoprefixer'
import useLocalMock from './mock/useMock'

const proxyConf = {
  '/test': {
    target: 'http://localhost:7001/', // 开发环境
    changeOrigin: true,
    rewrite: (path: any) => path.replace(/^\/test/, ''),
    onProxyReq: function (proxyReq: any, req: any) {
      console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
    }
  },
  '/yapi': {
    target: 'https://docs.dui88.com/mock/1474/',
    changeOrigin: true,
    rewrite: (path: any) => path.replace(/^\/yapi/, ''),
    onProxyReq: function (proxyReq: any, req: any) {
      console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
    }
  }
}

// https://vitejs.dev/config/
export const viteConfig: UserConfigExport = {
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    useLocalMock(),
    AutoImport({
      // arco 组件按需引入
      resolvers: [ArcoResolver()],
      // vue vue-router 自动导入
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: 'src/types/auto-import.d.ts' // 生成 `auto-import.d.ts` 全局声明
    }),
    Components({
      // arco 组件按需引入
      resolvers: [ArcoResolver({ importStyle: 'less' })],
      // components 目录按需引入
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/types/components.d.ts'
    })
  ],
  server: {
    proxy: proxyConf,
    // open: true,
    port: 10086
  },
  define: {
    'process.env': { ...process.env }
  },
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,

        modifyVars: {
          // 覆盖van默认样式的less文件
          hack: 'true; @import "/src/assets/styles/var.less";'
        }
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
          grid: true
        })
      ]
    }
  }
}

export default defineConfig(viteConfig)
