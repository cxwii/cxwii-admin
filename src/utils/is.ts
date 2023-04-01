const toString = Object.prototype.toString

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}