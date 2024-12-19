<template>
  <div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <div style="margin-top: 20px">
      <label>
        弯曲程度（半径）：{{ radius }}
        <input type="range" min="50" max="300" v-model="radius" @input="drawText" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Vue.js is amazing!',
      canvasWidth: 600,
      canvasHeight: 600,
      radius: 200 // 初始半径
    }
  },
  mounted() {
    this.drawText()
  },
  methods: {
    drawText() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const { text, radius, canvasWidth, canvasHeight } = this

      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2
      const totalAngle = (text.length * 15) / radius // 根据文字宽度和半径计算总角度
      const angleStep = totalAngle / text.length

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.font = '20px Arial'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      ctx.save()
      ctx.translate(centerX, centerY) // 以圆心为原点

      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const angle = -totalAngle / 2 + i * angleStep

        ctx.save()
        ctx.rotate(angle) // 旋转到字符所在的角度
        ctx.translate(0, -radius) // 将字符绘制到圆弧上
        ctx.fillText(char, 0, 0)
        ctx.restore()
      }

      ctx.restore()
    }
  }
}
</script>

<style>
canvas {
  border: 1px solid #ddd;
  display: block;
  margin: 0 auto;
}
input[type='range'] {
  width: 300px;
  margin-left: 10px;
}
</style>
