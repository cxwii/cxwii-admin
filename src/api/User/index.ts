import request from '@/config/axios'
import type { userLoginType } from './types'

export const loginApi = (data: userLoginType): Promise<any> => {
  return request.post({ url: '/login', data })
}

export const getRouterApi = (): Promise<any> => {
  return request.get({ url: '/getUserRouter' })
}