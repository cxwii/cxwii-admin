import type { App } from 'vue'
import { createPinia, PiniaPluginContext } from 'pinia'

const store = createPinia()

export const useStore = (app: App<Element>) => {
  app.use(store)
}

export { store }