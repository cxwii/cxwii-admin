// axios请求头类型
declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

// echart载体类型
// T extends HTMLElement = HTMLDivElement 指泛型参数的默认值是HTMLDivElement
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
// 声明一个T或null的类型(用于echart实例化和标签移动中)
declare type Nullable<T> = T | null
// 用于组件ref实例的类型InstanceType:获取类的实例类型
declare type ComponentRef<T> = InstanceType<T>
// 定义个用于目前缓存组件的类型,k为null | undefined时类型为string
declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>
// 用于缓存组件判断方法的类型
declare interface Fn<T = any> {
  (...arg: T[]): T
}