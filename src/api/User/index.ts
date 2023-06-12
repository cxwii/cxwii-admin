import request from '@/config/axios'
import type { useLoginType, useregisterType, deleteUserInfoType, updateUserInfoType } from './types'

// 登录
export const loginApi = (data: useLoginType): Promise<any> => {
  return request.post({ url: '/login', data })
}

// 注册
export const registerApi = (data: useregisterType): Promise<any> => {
  return request.post({ url: '/regUser', data })
}

// 获取用户列表
export const getUserInfoListApi = (): Promise<any> => {
  return request.get({ url: '/getUserInfoList' })
}

// 删除用户
export const deleteUserInfoApi = (data: deleteUserInfoType): Promise<any> => {
  return request.delete({ url: '/deleteUserInfo', data })
}

// 修改用户信息
export const updateUserInfoList = (data: updateUserInfoType): Promise<any> => {
  return request.post({ url: '/updateUserInfoList', data })
}

// 获取路由
export const getRouterApi = (): Promise<any> => {
  return request.get({ url: '/getUserRouter' })
}