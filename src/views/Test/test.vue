<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
const canvas = ref()
const progress = ref(0)

// 文本内容
const text = '123456'

// 创建 Canvas 绘图
const drawText = (progressValue: number) => {
  const ctx = canvas.value.getContext('2d')
  const width = canvas.value.width
  const height = canvas.value.height

  ctx.clearRect(0, 0, width, height)
  ctx.font = '30px Arial'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // 圆心和半径
  const centerX = width / 2
  const centerY = height / 2
  const radius = 100

  // 计算当前弯曲的角度
  const angleRange = Math.PI * 2 * progressValue // 完整圆为 2 * π
  const startAngle = -angleRange / 2 // 起始角度
  const charAngle = angleRange / (text.length - 1) // 每个字符的弯曲角度

  ctx.save()
  ctx.translate(centerX, centerY) // 将坐标系移至圆心
  ctx.rotate(-Math.PI / 2) // 旋转 90 度，使得圆形从竖直方向开始

  // 绘制每个字符
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const angle = startAngle + charAngle * i
    const x = Math.cos(angle) * radius - 80
    const y = Math.sin(angle) * radius + i * 15

    console.log('x :>> ', x)
    console.log('y :>> ', y)

    // 将上下文移至字符的圆周位置
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle + Math.PI / 2)
    ctx.fillText(char, 0, 0)
    ctx.restore()
  }

  ctx.restore()
}

watch(progress, (newProgress) => {
  drawText(newProgress)
})

onMounted(() => {
  drawText(progress.value)
})
</script>

<template>
  <div>
    <canvas ref="canvas" width="400" height="400"></canvas>
    <input type="range" v-model="progress" min="0" max="1" step="0.01" />
  </div>
</template>

<style scoped>
canvas {
  margin: 10px;
  border: 1px solid #ccc;
}
</style>
