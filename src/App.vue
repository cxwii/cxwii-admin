<script setup lang="ts">
import { ConfigGlobal } from '@/components/ConfigGlobal'
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
