import { ref } from 'vue'
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

// 返回的base64数组
const imgArr = ref<string[]>([])
// 文件名称
const fileName = ref<string>()
// 文件大小
const fileSize = ref<number>()
// 文件页数
const filePage = ref<number>()
// 缓冲的数据
let arrayBuffer: ArrayBuffer
// 判断的渲染计数器
let renderedPages: number
// canvas的dom容器
const canvasCont = document.createElement('div')

/**
 * 创建canvas
 */
const createCanvas = (parm: ArrayBuffer) => {
  // 使用getTextContent获取pdf内容
  PDFJS.getDocument(parm).promise.then((el) => {
    filePage.value = el.numPages
    renderedPages = 0 // 置空计数器

    for (let i = 1; i <= filePage.value; i++) {
      // 创建对应的canvas画布
      const canvas = document.createElement('canvas')
      canvas.id = `pageNum-${i}`
      const ctx = canvas.getContext('2d')
      canvasCont.append(canvas)

      openPage(el, i, ctx!) // 渲染canvas
    }
  })
}

/**
 * 渲染canvas
 */
const openPage = (
  pdfFile: PDFDocumentProxy,
  pageNumber: number,
  context: CanvasRenderingContext2D
) => {
  // 获取PDF文档中的各个页面
  pdfFile.getPage(pageNumber).then((page: any) => {
    // 获取pdf尺寸
    const viewport = page.getViewport()
    // 获取画布
    const canvas = context.canvas

    canvas.width = viewport.rawDims.pageWidth
    canvas.height = viewport.rawDims.pageHeight
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    // 不知道为什么镜像翻转了,要这里样式先翻转一次,后面画布内容再翻转一次导出
    canvas.style.transform = 'rotate(180deg) scaleX(-1)'

    const model = {
      canvasContext: context,
      viewport: viewport
    }
    // 导出至图片
    page.render(model).promise.then(() => {
      // 记数至最后一个渲染完毕开始导出
      renderedPages++
      if (renderedPages === filePage.value) {
        onExportImg()
      }
    })
  })
}

/**
 * 保存图片
 */
const onExportImg = () => {
  const eleList = canvasCont.querySelectorAll('canvas')

  // 遍历所有canvas节点
  for (let i = 0; i < eleList.length; i++) {
    const canvas = eleList[0]
    const context: any = canvas.getContext('2d')
    // 做镜像翻转
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const mirroredImageData = context.createImageData(imageData)
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const srcIndex = (y * canvas.width + x) * 4
        const destIndex = (y * canvas.width + (canvas.width - x - 1)) * 4
        mirroredImageData.data[destIndex] = data[srcIndex]
        mirroredImageData.data[destIndex + 1] = data[srcIndex + 1]
        mirroredImageData.data[destIndex + 2] = data[srcIndex + 2]
        mirroredImageData.data[destIndex + 3] = data[srcIndex + 3]
      }
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.putImageData(mirroredImageData, 0, 0)
    // 旋转180度
    context.save()
    context.translate(canvas.width / 2, canvas.height / 2)
    context.rotate(Math.PI)
    context.translate(-canvas.width / 2, -canvas.height / 2)
    context.drawImage(canvas, 0, 0)
    context.restore()
    canvas.style.transform = 'rotate(0deg) scaleX(1)'

    // 添加进集合
    imgArr.value.push(canvas.toDataURL())
  }
}

/**
 * pdf转换base64
 * @param file - 一个pdf的文件流
 * @returns imgArr数据合集,fileName文件名称,fileSize文件大小默认单位M,filePage文件页数
 */
export const usePdfToImg = (file: FileList) => {
  // 为window挂载一个pdfjs的一个工具pdfjsWorker
  ;(window as any).pdfjsWorker = pdfjsWorker

  // 文件名称和大小
  const { name, size } = file[0]
  fileName.value = name
  fileSize.value = size / 1024 / 1024 // m为单位可以自行调整

  // 读取文件内容并放入缓冲区
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file[0])
  fileReader.onload = (e) => {
    arrayBuffer = e.target?.result as ArrayBuffer
    createCanvas(arrayBuffer) // 创建canvas节点
  }

  return {
    imgArr,
    fileName,
    fileSize,
    filePage
  }
}
