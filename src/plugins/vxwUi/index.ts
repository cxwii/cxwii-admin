import type { App } from 'vue'

// 导入组件库
import vxwui from 'vxwui'
// 导入组件库样式
import 'vxwui/style.css'

export const useVxwUi = (app: App<Element>) => {
  app.use(vxwui)
}
