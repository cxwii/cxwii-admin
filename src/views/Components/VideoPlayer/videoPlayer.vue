<script lang="ts" setup>
import { VideoPlayer, Options } from '@/components/VideoPlayer'
import { ref } from 'vue'

const options = ref<Options>({
  url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
  poster: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg',
  height: '100%',
  width: '100%'
})

const test = () => {
  options.value.url = 'https://cesium.com/public/SandcastleSampleData/big-buck-bunny_trailer.mp4'
}
</script>

<template>
  <VideoPlayer :options="(options as Options)" />
  <el-button @click="test">测试切换视频源</el-button>
</template>

<style scoped lang="scss"></style>
