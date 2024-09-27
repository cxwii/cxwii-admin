<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 当前亮的灯
const currentLight = ref<'red' | 'green' | 'yellow'>('red')
let isRunning = ref(false)
let stopCycle = false

// 切换灯光的函数，返回一个 Promise，用于等待指定时间后切换灯光
const changeLight = (color: 'red' | 'green' | 'yellow', delay: number) => {
  return new Promise<void>((resolve) => {
    currentLight.value = color
    setTimeout(() => resolve(), delay * 1000)
  })
}

// 异步函数，控制灯的循环切换
const startLightCycle = async () => {
  while (!stopCycle) {
    await changeLight('red', 3) // 红灯亮 3 秒
    await changeLight('green', 2) // 绿灯亮 2 秒
    await changeLight('yellow', 1) // 黄灯亮 1 秒
  }
}

// 开关灯光的函数
const toggleLight = () => {
  if (isRunning.value) {
    stopCycle = true // 停止灯光循环
    isRunning.value = false // 更新状态
  } else {
    stopCycle = false // 启动灯光循环
    isRunning.value = true
    startLightCycle() // 开始灯光循环
  }
}

// 手动切换到指定灯光
const setLight = (color: 'red' | 'green' | 'yellow') => {
  stopCycle = true // 停止自动切换
  currentLight.value = color // 设置为指定的灯光
}

onMounted(() => {
  startLightCycle()
})

onUnmounted(() => {
  stopCycle = true // 组件卸载时停止灯光循环
})
</script>

<template>
  <div>
    <div
      class="light"
      :class="{ active: currentLight === 'red' }"
      style="background-color: red"
    ></div>
    <div
      class="light"
      :class="{ active: currentLight === 'green' }"
      style="background-color: green"
    ></div>
    <div
      class="light"
      :class="{ active: currentLight === 'yellow' }"
      style="background-color: yellow"
    ></div>

    <div>
      <el-button @click="toggleLight">开关</el-button>
      <el-button @click="setLight('red')">红灯亮</el-button>
      <el-button @click="setLight('green')">绿灯亮</el-button>
      <el-button @click="setLight('yellow')">黄灯亮</el-button>
    </div>
  </div>
</template>

<style scoped>
.light {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 50%;
  opacity: 0.3;
}

.active {
  opacity: 1;
}
</style>
