const config: {
  base_url: {
    dev: string
    pro: string
  }
  result_code: number | string
  invalid_token: number | string
  request_timeout: number
  default_headers: AxiosHeaders
} = {
  base_url: {
    // 开发环境接口
    dev: '/api',
    // 生成环境接口
    pro: ''
  },
  // 请求成功的响应码(用于在响应拦截器里过滤两层data)
  result_code: '200',
  // token过期的响应码
  invalid_token: '401',
  // 超时时间(毫秒单位,这里是60秒)
  request_timeout: 60000,
  // 请求类型
  default_headers: 'application/json'
}

export { config }
