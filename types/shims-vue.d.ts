import { VNode } from 'vue'

// 解决在jsx中使用t()这类函数时报错隐式any,不存在接口 "JSX.IntrinsicElements"的问题
declare type VueNode = VNode
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: unknown
    }
  }
}
