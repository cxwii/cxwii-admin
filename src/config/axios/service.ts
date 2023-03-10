import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'
import { config } from './config'

const { base_url } = config
export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL,
  timeout: config.request_timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    console.log('axios_request_error :>> ',error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return Promise.resolve(response)
  },
  (error: AxiosError) => {
    console.log('axios_response_error :>> ',error)
    Promise.reject(error)
  }
)

export { service }