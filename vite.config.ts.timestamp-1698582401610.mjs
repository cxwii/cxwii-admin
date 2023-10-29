// vite.config.ts
import { defineConfig } from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin/node_modules/.pnpm/registry.npmmirror.com+vite@4.1.4_rg7sbst2v3exiijf2cddyl6czi/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import VueJsx from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue-jsx@3.0.1_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueI18nPlugin from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin/node_modules/.pnpm/registry.npmmirror.com+@intlify+unplugin-vue-i18n@0.12.2_vue-i18n@9.2.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\cxw\\Desktop\\\u4E2A\u4EBA\\cxwii-admin";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // tsx语法支持
    VueJsx(),
    // svg支持
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]"
    }),
    // i18n控制台警告解决
    // 文档https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#intlifyunplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "src/locales/**")]
    })
    // eslint
    // EslintPlugin({
    //   cache: false,
    //   include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
    // })
  ],
  resolve: {
    // 路径别名
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@_public": path.resolve(__vite_injected_original_dirname, "public")
    }
  },
  server: {
    // 自动打开浏览器
    open: false,
    // 端口
    port: 9527,
    // 代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9528",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  assetsInclude: ["**/*.glb", "**/*.gltf"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjeHdcXFxcRGVza3RvcFxcXFxcdTRFMkFcdTRFQkFcXFxcY3h3aWktYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGN4d1xcXFxEZXNrdG9wXFxcXFx1NEUyQVx1NEVCQVxcXFxjeHdpaS1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY3h3L0Rlc2t0b3AvJUU0JUI4JUFBJUU0JUJBJUJBL2N4d2lpLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBFc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50J1xyXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tIFwiQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgLy8gdHN4XHU4QkVEXHU2Q0Q1XHU2NTJGXHU2MzAxXHJcbiAgICBWdWVKc3goKSxcclxuICAgIC8vIHN2Z1x1NjUyRlx1NjMwMVxyXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmdzJyldLFxyXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xyXG4gICAgfSksXHJcbiAgICAvLyBpMThuXHU2M0E3XHU1MjM2XHU1M0YwXHU4QjY2XHU1NDRBXHU4OUUzXHU1MUIzXHJcbiAgICAvLyBcdTY1ODdcdTY4NjNodHRwczovL2dpdGh1Yi5jb20vaW50bGlmeS9idW5kbGUtdG9vbHMvdHJlZS9tYWluL3BhY2thZ2VzL3VucGx1Z2luLXZ1ZS1pMThuI2ludGxpZnl1bnBsdWdpbi12dWUtaTE4blxyXG4gICAgVnVlSTE4blBsdWdpbih7XHJcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxyXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xvY2FsZXMvKionKV1cclxuICAgIH0pLFxyXG4gICAgLy8gZXNsaW50XHJcbiAgICAvLyBFc2xpbnRQbHVnaW4oe1xyXG4gICAgLy8gICBjYWNoZTogZmFsc2UsXHJcbiAgICAvLyAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudnVlJywgJ3NyYy8qKi8qLnRzJywgJ3NyYy8qKi8qLnRzeCddIC8vIFx1NjhDMFx1NjdFNVx1NzY4NFx1NjU4N1x1NEVGNlxyXG4gICAgLy8gfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgICdAX3B1YmxpYyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgIG9wZW46IGZhbHNlLFxyXG4gICAgLy8gXHU3QUVGXHU1M0UzXHJcbiAgICBwb3J0OiA5NTI3LFxyXG4gICAgLy8gXHU0RUUzXHU3NDA2XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xOjk1MjgnLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyouZ2xiJywgJyoqLyouZ2x0ZiddXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVQsU0FBUyxvQkFBb0I7QUFDcFYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFFckMsT0FBTyxtQkFBbUI7QUFOMUIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBO0FBQUEsSUFFSixPQUFPO0FBQUE7QUFBQSxJQUVQLHFCQUFxQjtBQUFBLE1BQ25CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsaUJBQWlCLENBQUM7QUFBQSxNQUN6RCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUE7QUFBQTtBQUFBLElBR0QsY0FBYztBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsU0FBUyxDQUFDLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0IsQ0FBQztBQUFBLElBQ3JELENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNSDtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDbEMsWUFBWSxLQUFLLFFBQVEsa0NBQVcsUUFBUTtBQUFBLElBQzlDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLE1BQU07QUFBQTtBQUFBLElBRU4sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFBQSxVQUFRQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsZUFBZSxDQUFDLFlBQVksV0FBVztBQUN6QyxDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
