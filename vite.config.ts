import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import EslintPlugin from 'vite-plugin-eslint'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 消除micro-app警告(把他当做自定义内容)
          isCustomElement: (tag) => {
            return tag.startsWith('micro-')
          }
        }
      }
    }),
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
    })
    // eslint
    // EslintPlugin({
    //   cache: false,
    //   include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
    // })
  ],
  // 如果要使用scss全局变量就打开这个配置
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "./src/styles/variables.module.scss";'
  //     }
  //   }
  // },
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@_public': path.resolve(__dirname, 'public')
    }
  },
  // define: {
  //   // 使 jQuery 成为全局变量
  //   $: 'jquery',
  //   jQuery: 'jquery'
  // },
  server: {
    // 自动打开浏览器
    open: false,
    // 端口
    port: 9527,
    host: true,
    // 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9528',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // three模型的一些文件后缀名
  assetsInclude: ['**/*.glb', '**/*.gltf']
})
