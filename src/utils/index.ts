export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
  // 满足原生findIndex就返回个原生findIndex给他用
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}
