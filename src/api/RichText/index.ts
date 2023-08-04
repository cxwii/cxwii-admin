import request from '@/config/axios'
import type { updateRichTextType } from './types'

// 获取富文本信息
export const getRichText = (): Promise<any> => {
  return request.get({ url: '/getRichText' })
}

// 更新富文本信息
export const updateRichText = (data: updateRichTextType): Promise<any> => {
  return request.post({ url: '/updateRichText', data })
}
