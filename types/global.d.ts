// axios请求头类型
declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

// echart载体类型
// T extends HTMLElement = HTMLDivElement 指泛型参数的默认值是HTMLDivElement
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
// echart实例化
declare type Nullable<T> = T | null