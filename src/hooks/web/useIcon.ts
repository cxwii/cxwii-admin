import { h } from 'vue'
import type { VNode } from 'vue'
import { ElIcon, IconTypes } from '@/components/ElementPlus/Icon'

export const useIcon = (props: IconTypes): VNode => {
  return h(ElIcon, props)
}
// 用于在一些非jsx中需要使用到components类型的icon,这样子就能方便的使用了
// 现在只是很简单的封装了一下,不支持任何复杂内容.哎嘿