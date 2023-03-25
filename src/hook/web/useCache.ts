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