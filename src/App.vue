<script setup lang="ts">
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const setDefaultTheme = () => {
  // 刷新的时候去再赋值一次主题
  userStore.setIsDark(userStore.getIsDark)
}
setDefaultTheme()
</script>

<template>
  <ConfigGlobal>
    <RouterView />
  </ConfigGlobal>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
</style>
