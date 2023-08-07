<script lang="ts" setup>
import { Qrcode } from '@/components/Qrcode'
import logoImg from '@/assets/imgs/vuex-store.png'
import { ref, unref } from 'vue'

const title = ref('cxwi-admin')
const asyncTitle = ref('')

setTimeout(() => {
  asyncTitle.value = unref(title)
}, 3000)

const clickCode = () => {
  console.log('点击了二维码 :>> ')
}

const disabledClick = () => {
  console.log('二维码失效了 :>> ')
}
</script>

<template>
  <div class="flex flex-col">
    <span>canvas二维码</span>
    <Qrcode :text="title" />

    <span>异步加载中的二维码</span>
    <Qrcode :text="asyncTitle" />

    <span>img二维码</span>
    <Qrcode :text="title" tag="img" />

    <span>logo二维码</span>
    <Qrcode :text="title" :logo="logoImg" />

    <span>logo二维码(以canvas绘制的logo,可以有更多样式)</span>
    <Qrcode
      :text="title"
      :logo="{
        src: logoImg,
        logoSize: 0.2,
        borderSize: 0.05,
        borderRadius: 50,
        bgColor: 'pink',
        logoRadius: 1
      }"
    />

    <span>失效了的二维码</span>
    <Qrcode :text="title" :disabled="true" disabledText="失效" @disabled-click="disabledClick" />

    <span>点击事件的二维码</span>
    <Qrcode :text="title" @click="clickCode" />

    <span>宽度大小设置</span>
    <Qrcode :text="title" :width="100" />
  </div>
</template>

<style scoped lang="scss"></style>
