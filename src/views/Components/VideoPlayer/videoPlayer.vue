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
  <!-- 要给一个有宽高固定的容器来存放(MainContent的原因,el-scrollbar__view是内容撑开的),并没有任何问题,是设计概念的问题,要在这个基础上做响应式就要操作这个外层的div -->
  <div style="height: 500px;width: 800px;">
    <VideoPlayer :options="(options as Options)" />
  </div>
  <el-button @click="test">测试切换视频源</el-button>
</template>

<style scoped lang="scss">
</style>
