import { Ref } from 'vue'

/**
 * scale实现的大屏响应式
 * @param dom - ref类型的dom底座
 * @param width - dom底座宽度，默认值为 1920。
 * @param height - dom底座高度，默认值为 1080。
 * @returns install()和uninst(),分别在对应生命周期中使用
 */
export const useResize = (dom: Ref<HTMLElement>, width = 1920, height = 1080) => {
  const resize = () => {
    if (dom.value) {
      dom.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
    }
  }

  const getScale = () => {
    const ww = window.innerWidth / width
    const wh = window.innerHeight / height
    return ww < wh ? ww : wh
  }

  const install = () => {
    if (dom.value) {
      dom.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
      dom.value.style.width = `${width}px`
      dom.value.style.height = `${height}px`
    }
    window.addEventListener('resize', resize)
  }

  const uninst = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    install,
    uninst
  }
}
