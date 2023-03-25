import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    VueJsx()
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    // 自动打开浏览器
    open: false,
    // 端口
    port: 9527,
    // 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9528',
        changeOrigin: true,
        // 我的api带有/api所以不换
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
