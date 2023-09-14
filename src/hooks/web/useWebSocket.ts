const baseURL = import.meta.env.VITE_APP_BASE_WS // WebSocket连接地址默认使用环境变量里的
const EventTypes = ['open', 'close', 'message', 'error', 'reconnect'] // 允许订阅的事件
const DEFAULT_CHECK_TIME = 55 * 1000 // 心跳检测的默认时间
const DEFAULT_CHECK_COUNT = 3 // 心跳检测默认失败重连次数
const CLOSE_ABNORMAL = 1006 // WebSocket非正常关闭code码
const DEFAULT_CHECK_DATA = { Type: 1, Parameters: ['alive'] } // 心跳检测的默认参数 - 跟后端协商的
const defaultOptions: Options = { url: '127.0.0.1:9528' } // 默认的配置项

// ts类型
export type EventTypes = 'open' | 'close' | 'message' | 'error' | 'reconnect'
export type Callback = Function
export type Options = {
  url?: string
  protocols?: string | Array<string>
  query?: {
    [key: string]: string
  }
  greet?: string
  customBase?: string
}

// 发布订阅收集器
class EventMap {
  deps = new Map()
  depend(eventType: EventTypes, callback: Callback) {
    this.deps.set(eventType, callback)
  }
  notify(eventType: EventTypes, event: unknown) {
    if (this.deps.has(eventType)) {
      this.deps.get(eventType)(event)
    }
  }
}

// WebSocket封装的新对象
export class Socket extends WebSocket {
  heartCheckData = DEFAULT_CHECK_DATA
  heartCheckTimeout = DEFAULT_CHECK_TIME
  heartCheckInterval: number | undefined
  heartCheckCount = DEFAULT_CHECK_COUNT

  _currentOptions: Options
  _dep: EventMap
  _reconnectCount: number

  constructor(options: Options, dep: EventMap, reconnectCount: number = 0) {
    let _baseURL = baseURL
    const { url, protocols, query = {}, greet = null, customBase = null } = options

    const _queryParams = Object.keys(query).reduce((str, key) => {
      // 防止注入对象和方法
      if (typeof query[key] !== 'object' && typeof query[key] !== 'function') {
        return (str += str.length > 0 ? `&${key}=${query[key]}` : `?${key}=${query[key]}`)
      } else {
        return str
      }
    }, '')
    if (customBase) {
      _baseURL = customBase
    }
    // 父类WebSocket的创建
    super(`${_baseURL}${url}${_queryParams}`, protocols)

    // 给实例附加一些暴露再外可以查看的属性
    this._currentOptions = options
    this._dep = dep
    this._reconnectCount = reconnectCount

    // 有心跳检测信息就附加到实例上
    greet &&
      Object.assign(this, {
        heartCheckData: greet
      })

    // 初始化监听事件
    this.initSocket()
  }

  // 初始化WebSocket
  initSocket() {
    // 监听webSocket的事件
    this.onopen = (e) => {
      this._dep.notify('open', e)
      this.heartCheckStart()
    }
    this.onclose = (e) => {
      this._dep.notify('close', e)
      // 如果WebSocket是非正常关闭 则进行重连
      if (e.code === CLOSE_ABNORMAL) {
        if (this._reconnectCount < this.heartCheckCount) {
          this._reconnectCount++
          const _socket = new Socket(this._currentOptions, this._dep, this._reconnectCount)
          this._dep.notify('reconnect', _socket)
        } else {
          return alert('WebSocket重连失败, 请联系技术客服!')
        }
      }
    }
    this.onerror = (e) => {
      this._dep.notify('error', e)
    }
    this.onmessage = (e) => {
      // 如果后端返回的是二进制数据
      if (e.data instanceof Blob) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(e.data)
        reader.onload = (ev) => {
          if (ev.target?.readyState === FileReader.DONE) {
            this._dep.notify('message', ev.target?.result)
          }
        }
      } else {
        // 处理普通数据
        try {
          const _parseData = JSON.parse(e.data)
          this._dep.notify('message', _parseData)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  // 订阅事件
  subscribe(eventType: EventTypes, callback: Callback) {
    if (typeof callback !== 'function') throw new Error('The second param is must be a function!')
    if (!EventTypes.includes(eventType)) throw new Error('The first param is not supported!')
    this._dep.depend(eventType, callback)
  }

  // 发送消息
  sendMessage(data: any, transformJSON?: boolean) {
    this.send(transformJSON ? JSON.stringify(data) : data)
  }

  // 关闭WebSocket
  closeSocket(code?: number | undefined, reason?: string | undefined) {
    this.close(code, reason)
  }

  // 开始心跳检测
  heartCheckStart() {
    this.heartCheckInterval = window.setInterval(() => {
      if (this.readyState === this.OPEN) {
        const transformJSON = typeof this.heartCheckData === 'object'
        this.sendMessage(this.heartCheckData, transformJSON)
      } else {
        this.clearHeartCheck()
      }
    }, this.heartCheckTimeout)
  }

  // 清除心跳检测
  clearHeartCheck() {
    clearInterval(this.heartCheckInterval)
  }

  // 重置心跳检测
  resetHeartCheck() {
    clearInterval(this.heartCheckInterval)
    this.heartCheckStart()
  }
}

export const useSocket = (options: Options = defaultOptions): Socket => {
  if (!window.WebSocket) alert('您的浏览器不支持WebSocket, 请更换浏览器!')
  const dep = new EventMap()
  const reconnectCount = 0
  return new Socket(options, dep, reconnectCount)
}
