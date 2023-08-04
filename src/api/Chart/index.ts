import request from '@/config/axios'
import type { useGetStaticChartOptionType } from './types'

// 获取静态图表数据
export const getStaticChartOption = (data: useGetStaticChartOptionType): Promise<any> => {
  return request.post({ url: '/getStaticChartOption', data })
}
