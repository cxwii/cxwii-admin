<script lang="ts" setup>
import * as PdfJs from 'pdfjs-dist'
PdfJs.GlobalWorkerOptions.workerSrc = '../../../../public/pdf.worker.min.mjs'

const convertFile = () => {
  let fileInput = (document.getElementById('input') as HTMLInputElement).files

  if (fileInput) {
    let file = fileInput[0]
    let reader = new FileReader()

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer

      const loadingTask = PdfJs.getDocument({
        data: arrayBuffer
        // password: '' // 默认的密码
      })

      // 密码的回调
      let userPassword: any
      loadingTask.onPassword = (updatePassword: Function, reason: number) => {
        if (reason === PdfJs.PasswordResponses.NEED_PASSWORD) {
          userPassword = prompt('加密pdf,请输入密码')
          updatePassword(userPassword)
        } else if (reason === PdfJs.PasswordResponses.INCORRECT_PASSWORD) {
          userPassword = prompt('密码错误')
          updatePassword(userPassword)
        }
      }

      loadingTask.promise.then((pdf) => {
        console.log('页数 :>> ', pdf.numPages)
        console.log('密码 :>> ', userPassword)
      })
    }

    reader.readAsArrayBuffer(file)
  }
}
</script>

<template>
  <input id="input" type="file" accept="application/pdf" @change="convertFile()" />
</template>

<style scoped lang="scss"></style>
