import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import EslintPlugin from 'vite-plugin-eslint'
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"

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
    // i18n控制台警告解决
    // 文档https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#intlifyunplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'src/locales/**')]
    }),
    // eslint
    EslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
    })
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
