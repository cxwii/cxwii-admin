<script lang="ts" setup>
import { ref } from 'vue'
import { ElThemeSwitch } from '@/components/ElementPlus/ThemeSwitch'

const isDark = ref(false)

const test = () => {
  isDark.value = !isDark.value
  console.log('isDark.value :>> ', isDark.value)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
}

const test2 = () => {
  console.log('test2 :>> ')
  window.localStorage.setItem('myCat', 'Tom')
}
</script>

<template>
  <span>测试页面</span>
  <div class="w-28 h-28 dark:bg-[var(--bg-color)]"> </div>
  <el-button @click="test">test</el-button>
  <el-button @click="test2">test2</el-button>
  <ElThemeSwitch />
</template>

<style scoped lang="scss">
.foo {
  // 如果有背景样式在,会覆盖主题的,所以要用原子化样式去写背景颜色在去主题切换
  background-color: #282727;
}
</style>
