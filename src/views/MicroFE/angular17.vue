<script lang="ts" setup>
// 微前端中主应用非angular，那么主应用需要引入zone.js才能正确加载angular子应用
import 'zone.js'

// 这里会有一个angular报水合时index.html被修改的错误,这个疑似是MicroApp和angular17理念冲突的问题,因为MicroApp本身就是要劫持index.html来实现MicroFE的
</script>

<template>
  <!-- 不知道为什么不用iframe就不行.会有import导入错误的问题 -->
  <micro-app
    name="angular17"
    url="http://localhost:8863/"
    baseroute="angular17"
    keep-alive
    iframe
  />
</template>

<style scoped lang="scss"></style>
