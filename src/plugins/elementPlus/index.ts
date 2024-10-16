import type { App } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const useElementPlus = (app: App<Element>) => {
  app.use(ElementPlus)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
