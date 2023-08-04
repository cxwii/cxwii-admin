import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { config } from './config'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { useCache } from '@/hooks/web/useCache'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { resetRouter } from '@/router'

const tagsViewStore = useTagsViewStore()
const { wsCache } = useCache()
const { base_url, result_code, invalid_token } = config
export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL,
  timeout: config.request_timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 每次请求加上token
    config.headers.Authorization = wsCache.get('token')
    return config
  },
  (error: AxiosError) => {
    console.log('axios_request_error :>> ', error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.data.status == result_code) {
      return Promise.resolve(response.data) as any
    } else if (response.data.status == invalid_token) {
      ElMessage.error('登录信息过期请重新登录')
      // 这里还要调个退出登录的api才行,现在单纯清空本地存储的用户信息
      wsCache.clear() // 清除本地所有缓存
      tagsViewStore.delAllViews() // 清除标签的所有缓存
      resetRouter() // 重置静态路由表
      router.replace('/login') // 去登录页
    } else {
      ElMessage.error(response.data.message)
    }
  },
  (error: AxiosError) => {
    console.log('axios_response_error :>> ', error)
    Promise.reject(error)
  }
)

export { service }
