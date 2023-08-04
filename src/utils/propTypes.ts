import VueTypes, { toType, toValidableType } from 'vue-types'

export default class ProjectTypes extends VueTypes {
  // 这两个是自定义类型,官网的案例,现在没用到
  // static maxLength(max) {
  //   return toType('maxLength', {
  //     type: String,
  //     validator: (max, v) => v.length <= max,
  //   })
  // }
  // static get positive() {
  //   return toValidableType('positive', {
  //     type: Number,
  //     validator: (v: number): boolean => v > 0,
  //   })
  // }
}
