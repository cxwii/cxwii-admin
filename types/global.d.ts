// axios请求头类型
declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

// echart载体类型(待研究)
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
// echart实例化(待研究)
declare type Nullable<T> = T | null