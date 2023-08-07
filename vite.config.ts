import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import EslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    // tsx语法支持
    VueJsx(),
    // svg支持
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      symbolId: 'icon-[dir]-[name]'
    }),
    // eslint
    // EslintPlugin({
    //   cache: false,
    //   include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
    // })
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
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
