<script setup lang="ts">
import { configGlobal } from '@/components/configGlobal'
</script>

<template>
  <configGlobal>
    <RouterView />
  </configGlobal>
</template>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
