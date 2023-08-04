import { defineStore } from 'pinia'
import { store } from '../index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useCache } from '@/hooks/web/useCache'
import { LocaleDropdownType } from '@/types/localeDropdown'

const { wsCache } = useCache()

const elLocaleMap = {
  'zh-CN': zhCn,
  en: en
}
interface LocaleState {
  currentLocale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}
const key: keyof typeof elLocaleMap = 'zh-CN'

export const useLocaleStore = defineStore('locales', {
  state: (): LocaleState => ({
    currentLocale: {
      lang: wsCache.get('lang') || 'zh-CN',
      elLocale: elLocaleMap[key]
    },
    localeMap: [
      {
        lang: 'zh-CN',
        name: '简体中文'
      },
      {
        lang: 'en',
        name: 'English'
      }
    ]
  }),
  getters: {
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap
    }
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
      wsCache.set('lang', localeMap?.lang)
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
