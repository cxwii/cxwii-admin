<script lang="ts" setup>
import { useTimer } from '@/utils/timer'
const { _setTimeout, _setInterval } = useTimer()
let id: any = null
const test = () => {
  id = _setInterval((e: any) => {
    console.log('执行 :>> ', e)
  }, 3000)
}
const test2 = () => {
  clearInterval(id)
  console.log('id :>> ', id)
}
</script>

<template>
  <el-button type="primary" @click="test">测试</el-button>
  <el-button type="primary" @click="test2">清除</el-button>
</template>

<style></style>
