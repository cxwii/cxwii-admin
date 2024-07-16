<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { usePdfToImg } from '@/hooks/utils/pdfToImg'
import * as turn from '@/utils/turn.js'

import img1 from '@/assets/imgs/user.png'
import img2 from '@/assets/imgs/vuex-store.png'

console.log('turn :>> ', turn)

const name = ref()
const size = ref()
const page = ref()
const arr = ref()

const convertFile = () => {
  let file = (document.getElementById('input') as HTMLInputElement).files
  const { imgArr, fileName, fileSize, filePage } = usePdfToImg(file!)
  name.value = fileName.value
  size.value = Number(fileSize.value).toFixed(2)
  page.value = filePage.value?.toString()
  arr.value = imgArr.value
}

const onTurnPre = () => {
  $('#flipbook').turn('previous')
}
const onTurnNext = () => {
  $('#flipbook').turn('next')
}

onMounted(() => {
  $('#flipbook').turn({
    //启用硬件加速,移动端有效
    acceleration: false,
    //显示：single=单页，double=双页，默认双页
    display: 'double',
    // 翻页撒开鼠标，页面的延迟
    duration: 800,
    // 默认显示第几页
    page: 1,
    // 折叠处的光泽渐变，主要体现翻页的立体感、真实感
    gradients: true,
    // 中心翻取决于有多少页面可见 true or false
    autoCenter: true,
    // 设置可翻页的页角(都试过了，乱写 4个角都能出发卷起)， bl,br   tl,tr   bl,tr
    turnCorners: 'bl,br',
    //页面高度
    height: 500,
    //翻书范围宽度，总宽度
    width: 500,
    when: {
      //监听事件
      turning: function (e: any, page: any, view: any) {
        console.log('翻页前触发')
        console.log(e, page, view)
        // 翻页前触发
        console.log(page)
      },
      turned: function (e: any, page: any) {
        console.log('翻页后触发')
        console.log(e, page)
        // 翻页后触发
        console.log(page)
      }
    }
  })
})
</script>

<template>
  <div class="flex">
    <input id="input" type="file" accept="application/pdf" @change="convertFile()" />
    <div>名称：{{ name }}</div>
    <div>大小：{{ size ? `${size}M` : `` }}</div>
    <div>页数：{{ page }}</div>
  </div>
  <el-button @click="onTurnPre()">上一页</el-button>
  <el-button @click="onTurnNext()">下一页</el-button>
  <div class="readBox">
    <div id="flipbook">
      <div class="hard"> 封面 </div>
      <div class="hard"></div>

      <div class="page">
        <img :src="img1" />
      </div>
      <div class="page">
        <img :src="img2" />
      </div>
      <div class="page">
        <img :src="img1" />
      </div>
      <div class="page">
        <img :src="img2" />
      </div>

      <div class="hard"></div>
      <div class="hard"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.readBox {
  width: 800px;
  height: 800px;
  .page {
    background-color: red;
  }
  .hard {
    background-color: aqua;
  }
}
</style>
