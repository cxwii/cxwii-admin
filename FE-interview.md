# 前端面试题(个人用)

## 1.JS

1.promise

promise三个状态：进⾏中（pending）、已完成(fulfilled)、已拒绝（rejected）
promise使用: 
```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 300)
})
```
手写Promise:
```js
class MyPromise {
  constructor(callback) {
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    // 存储成功状态的回调函数
    this.onResolvedCallbacks = []
    // 存储失败状态的回调函数
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status == 'pending') {
        this.status = 'resolved'
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status == 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      callback(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    // 防止传入的不是函数
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status == 'resolved') {
        console.log('1111111111')
        try {
          const x = onResolved(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status == 'rejected') {
        console.log('2222222')
        try {
          const x = onRejected(this.reason)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status == 'pending') {
        console.log('333333333333')
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
  catch(onRejected) {
    // 函数糖的方式使用
    return this.then(null, onRejected)
  }
}

```

