import request from '@/config/axios'
import type { useLoginType, useregisterType, deleteUserInfoType, updateUserInfoType } from './types'

// interface Data<T> {
//   status: number
//   message: string
//   data: T
// }

// 登录
// 可以这样子去定义请求返回的类型
// 不过接口要规范才行,我这里接口不规范所以不写了
// export const loginApi = (data: useLoginType): Promise<Data<number>> => {
//   return request.post({ url: '/login', data })
// }

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

// 获取路由(后端传递表)
export const getRdRouterApi = (): Promise<any> => {
  return request.get({ url: '/getUserRdRouter' })
}

// 获取路由(code过滤表)
export const getCodeRouterApi = (): Promise<any> => {
  return request.get({ url: '/getUserCodeRouter' })
}
