/* 
  配置浏览器本地存储的方式，可直接存储对象数组
*/

import WebStorageCache from 'web-storage-cache'

type cacheType = 'sessionStorage' | 'localStorage'

export const useCache = (type: cacheType = 'sessionStorage') => {
  const wsCache: WebStorageCache = new WebStorageCache({
    storage: type
  })

  return {
    wsCache
  }
}
