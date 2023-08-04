import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { NProgressOptions } from 'nprogress'

export const useNProgress = () => {
  // 关掉右上角的螺旋加载动画
  NProgress.configure({ showSpinner: false } as NProgressOptions)

  const start = () => {
    NProgress.start()
  }

  const done = () => {
    NProgress.done()
  }

  return {
    start,
    done
  }
}
