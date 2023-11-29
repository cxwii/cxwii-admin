<script lang="ts" setup>
import { ref } from 'vue'

const isDark = ref(false)

const test = () => {
  isDark.value = !isDark.value
  console.log('isDark.value :>> ', isDark.value);
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div
    class="foo">
  </div>
  <el-button ref="foo" @click="test">test</el-button>
</template>

<style scoped lang="scss">
.foo {
  width: 100px;
  height: 100px;
  // background-color: $foobg;
}
</style>
