const config: {
  base_url: {
    dev: string
    pro: string
  }
  request_timeout: number
  default_headers: AxiosHeaders
} = {
  base_url: {
    // 开发环境接口
    dev: '/api',
    // 生成环境接口
    pro: ''
  },
  // 超时时间
  request_timeout: 60000,
  // 请求类型
  default_headers: 'application/json'
}

export { config }