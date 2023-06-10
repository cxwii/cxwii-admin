import request from '@/config/axios'
import type { useLoginType, useregisterType } from './types'

export const loginApi = (data: useLoginType): Promise<any> => {
  return request.post({ url: '/login', data })
}

export const registerApi = (data: useregisterType): Promise<any> => {
  return request.post({ url: '/regUser', data })
}

export const getRouterApi = (): Promise<any> => {
  return request.get({ url: '/getUserRouter' })
}