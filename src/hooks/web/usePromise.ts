export class MyPromise {
  status: string
  value: string
  reason: string
  onResolvedCallbacks: any[]
  onRejectedCallbacks: any[]

  constructor(callback: any) {
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    // 存储成功状态的回调函数
    this.onResolvedCallbacks = []
    // 存储失败状态的回调函数
    this.onRejectedCallbacks = []
    const resolve = (value: any) => {
      if (this.status == 'pending') {
        this.status = 'resolved'
        this.value = value
        this.onResolvedCallbacks.forEach((fn: any) => fn())
      }
    }
    const reject = (reason: any) => {
      if (this.status == 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn: any) => fn())
      }
    }
    try {
      callback(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved: any, onRejected: any) {
    // 防止传入的不是函数
    onResolved = typeof onResolved === 'function' ? onResolved : (value: any) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason }

    const promise2 = new MyPromise((resolve: any, reject: any) => {
      if (this.status == 'resolved') {
        try {
          const x = onResolved(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status == 'rejected') {
        try {
          const x = onRejected(this.reason)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status == 'pending') {
        this.onResolvedCallbacks.push(() => {
          if (this.status == 'resolved') {
            try {
              const x = onResolved(this.value)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          }
        })
        this.onRejectedCallbacks.push(() => {
          if (this.status == 'rejected') {
            try {
              const x = onRejected(this.reason)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          }
        })
      } else {
        // 执行完所有回调函数之后，清空回调数组
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
      }
    })
    return promise2
  }
  catch(onRejected: any) {
    // 函数糖的方式构建catch
    return this.then(null, onRejected)
  }
}

export const usePromise = (value: any) => {
  return new MyPromise(value)
}