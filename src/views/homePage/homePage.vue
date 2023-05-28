<script lang="ts" setup>
import { constantRoutes, asyncRouter } from '@/router'
import { loginApi, getRouterApi } from '@/api/User'
import { unref } from 'vue'

import { flatMultiLevelRoutes, generateRoutesFn1 } from '@/utils/routerHelper'

const tset = async() => {
  const res = await getRouterApi()
  console.log('动态 :>> ', res);
}
</script>

<template>
homePage
<button @click="tset">测试</button>
</template>

<style scoped lang="scss">

</style>