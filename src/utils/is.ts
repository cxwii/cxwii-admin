const toString = Object.prototype.toString

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}

export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number')
}
