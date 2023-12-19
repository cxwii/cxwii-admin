<script lang="ts" setup>
import { ref, shallowRef, triggerRef, watchEffect, onMounted } from 'vue'

const foo = shallowRef({
  count: 1,
  greet: 'hello'
})

const test = () => {
  console.log('test1 :>> ', foo)
  foo.value.count++
  console.log('test2 :>> ', foo)
}
const test2 = () => {
  console.log('test3 :>> ', foo.value.count)
}

watchEffect(() => {
  console.log(foo.value.greet)
})

const test3 = () => {
  // 这个不会触发
  foo.value.greet = 'Hello, universe'
  // 触发浅层响应式的更新
  triggerRef(foo)
}
</script>

<template>
  <span>测试页面</span>
  {{ foo }}
  <div class="w-28 h-28 dark:bg-[var(--bg-color)]"> </div>
  <el-button @click="test">test</el-button>
  <el-button @click="test2">test2</el-button>
  <el-button @click="test3">test3</el-button>
</template>

<style scoped lang="scss">
.foo {
  // 如果有背景样式在,会覆盖主题的,所以要用原子化样式去写背景颜色在去主题切换
  background-color: #282727;
}
</style>
