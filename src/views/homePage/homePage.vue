<script lang="ts" setup>
import { constantRoutes, asyncRouter } from '@/router'
import { loginApi, getRouterApi } from '@/api/User'
import { unref, ref } from 'vue'
import { flatMultiLevelRoutes, generateRoutesFn1 } from '@/utils/routerHelper'

let text = ref()

const tset = async() => {
  console.log('数据 :>> ', text);
}

// const app = () => {
//   return(
//     <>
//       {text.value}
//     </>
//   )
// }
</script>

<template>
  <textarea style="width: 300px;height: 300px;" v-model="text"></textarea>
  <div v-html="text"></div>
  <button @click="tset">测试</button>
</template>

<style scoped lang="scss">

</style>