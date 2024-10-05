/**
 * 返回_setTimeout和_setInterval,
 * 与原生使用方式一致,
 * 唯一不同是他们都是唯一的,
 * 再次调用会自动清除上一次的定时器
 */
export const useTimer = () => {
  let _setTimeoutId: Nullable<number> = null
  let _setIntervalId: Nullable<number> = null

  const _setTimeout = (functionRef: TimerHandler, delay?: number, ...param: any[]): number => {
    if (_setTimeoutId) {
      clearTimeout(_setTimeoutId)
      _setTimeoutId = null
    }
    _setTimeoutId = setTimeout(functionRef, delay, ...param)
    return _setTimeoutId
  }

  const _setInterval = (functionRef: TimerHandler, delay?: number, ...param: any[]): number => {
    if (_setIntervalId) {
      clearInterval(_setIntervalId)
      _setIntervalId = null
    }
    _setIntervalId = setInterval(functionRef, delay, ...param)
    return _setIntervalId
  }

  return {
    _setTimeout,
    _setInterval
  }
}
