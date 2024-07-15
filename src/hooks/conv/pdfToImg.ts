import { ref } from 'vue'
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

// 返回的base64数组
const imgArr = ref<string[]>()
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
      let canvas = document.createElement('canvas')
      canvas.id = `pageNum-${i}`
      let ctx = canvas.getContext('2d')
      canvasCont.append(canvas)

      openPage(el, i, ctx!) // 渲染canvas
    }
  })
}

/**
 * 渲染canvas
 */
const openPage = (pdfFile: PDFDocumentProxy, pageNumber: number, context: CanvasRenderingContext2D) => {
  // 获取PDF文档中的各个页面
  pdfFile.getPage(pageNumber).then((page: any) => {
    // 获取pdf尺寸
    let viewport = page.getViewport()

    let canvas = context.canvas

    canvas.width = viewport.rawDims.pageWidth
    canvas.height = viewport.rawDims.pageHeight

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    
    canvas.style.transform = 'rotate(180deg) scaleX(-1)'

    let model = {
      canvasContext: context,
      viewport: viewport
    }
    // 渲染PDF
    page.render(model).promise.then(() => {
      renderedPages++
      if (renderedPages === filePage.value) {
        onExportImg()
      }
    })
  })
}

/**
 * pdf转换base64
 */
export const usePdfToImg = (file: FileList) => {
  // 为window挂载一个pdfjs的一个工具pdfjsWorker
  (window as any).pdfjsWorker = pdfjsWorker

  // 文件名称和大小
  let { name, size } = file[0]
  fileName.value = name
  fileSize.value = size / 1024 / 1024 // m为单位可以自行调整

  // 读取文件内容并放入缓冲区
  let fileReader = new FileReader()
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
