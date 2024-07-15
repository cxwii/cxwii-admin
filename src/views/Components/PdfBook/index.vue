<script lang="ts" setup>
import { ref } from 'vue'
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs'
;(window as any).pdfjsWorker = pdfjsWorker

// arrayBuffer
const arrayBuffer = ref()
// 文件名称
const fileName = ref()
// 文件大小
const fileSize = ref(0)
// 文件页数
const filePage = ref(0)

/**
 * 读取文件内容
 */
const convertFile = () => {
  let file = (document.getElementById('input') as any).files
  console.log('文件格式 :>> ', file)

  if (!file.length) return
  let { name, size } = file[0]

  fileName.value = name
  fileSize.value = size / 1024 / 1024
  // Object.assign(this, { fileName: name, fileSize: size / 1024 / 1024 })

  // 使用FileReader对象，web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容，可以使用File对象或者Blob对象来指定所要处理的文件或数据
  let fileReader = new FileReader()
  // 异步按字节读取文件内容，结果用ArrayBuffer对象表示
  fileReader.readAsArrayBuffer(file[0])
  fileReader.onload = (e) => {
    let arrayBufferData = (arrayBuffer.value = e.target!.result)
    // 创建canvas节点
    createCanvas(arrayBufferData)
  }
}

// 渲染计数器
let renderedPages = 0

/**
 * 创建canvas
 */
const createCanvas = (val: any) => {
  // 清空节点下数据
  ;(document.getElementById('container') as any).innerHTML = ''
  // 使用getTextContent获取pdf内容
  PDFJS.getDocument(val).promise.then((el: any) => {
    let filePageData = (filePage.value = el.numPages)

    renderedPages = 0 // 重置计数器

    for (let i = 1; i <= filePageData; i++) {
      let canvas = document.createElement('canvas')
      canvas.id = `pageNum-${i}`
      let context = canvas.getContext('2d')

      document.getElementById('container')!.append(canvas)

      // 渲染canvas
      openPage(el, i, context)
    }
  })
}

/**
 * 渲染canvas
 */
const openPage = (pdfFile: any, pageNumber: any, context: any) => {
  // 获取PDF文档中的各个页面
  pdfFile.getPage(pageNumber).then((page: any) => {
    // 设置展示比例
    let scale = 1
    let roate = 90
    // 获取pdf尺寸
    let viewport = page.getViewport(scale, roate)

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
 * 保存图片
 */
const onExportImg = () => {
  let eleList = document.querySelectorAll('canvas')
  // 遍历所有canvas节点
  for (let i = 0; i < eleList.length; i++) {
    let canvas: any = document.getElementById(`pageNum-${i + 1}`)

    const context = canvas.getContext('2d')
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

    console.log('canvas :>> ', canvas.toDataURL())
  }
}
</script>

<template>
  <div id="page09">
    <div class="info-box">
      <div class="input">
        <input id="input" type="file" accept="application/pdf" @change="convertFile()" />
      </div>
      <div class="cell">
        <div>名称：{{ fileName || '-' }}</div>
        <div>大小：{{ Number(fileSize).toFixed(2) }}M</div>
        <div>页数：{{ filePage }}</div>
        <el-button @click="onExportImg">保存图片</el-button>
      </div>
    </div>

    <div id="container"></div>
  </div>
</template>

<style scoped lang="scss">
#page09 {
  width: 800px;
  margin: 0 auto;

  .info-box {
    position: relative;

    .input {
      margin: 15px 0;

      #input {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    .cell {
      margin: 15px 0;
      display: flex;
      justify-content: space-around;

      div {
        margin-right: 20px;
      }
    }
  }

  #container {
    width: 100%;
    min-height: 850px;
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 10px;

    canvas {
      margin-bottom: 10px;
      border: 1px solid #ff6700;
      border-radius: 10px;
    }
  }
}
</style>
