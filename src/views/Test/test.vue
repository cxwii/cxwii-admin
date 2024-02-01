<script lang="ts" setup>
import { ref, shallowRef, triggerRef, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Eldrawer } from '@/components/ElementPlus/Drawer'

// #region
const { push } = useRouter()
const toHome = () => {
  push({ path: '/home/homePage' })
}
// #endregion

// 测试内容👇(随便写的乱七八糟的笔记这类)
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

const canvas = ref<HTMLCanvasElement>()
onMounted(() => {
  const ctx = canvas.value?.getContext('2d')

  // 二次赛贝尔曲线
  const path2d = new Path2D()
  path2d.moveTo(160, 200)
  path2d.quadraticCurveTo(100, 200, 100, 100)
  path2d.quadraticCurveTo(100, 50, 200, 50)
  path2d.quadraticCurveTo(300, 50, 300, 100)
  path2d.quadraticCurveTo(300, 200, 200, 200)
  path2d.quadraticCurveTo(200, 230, 150, 230)
  path2d.quadraticCurveTo(180, 210, 160, 200)

  ctx!.stroke(path2d)

  // 三次赛贝尔曲线
  // Path2D()还可以接受svg的path参数的形式画图
  const path2d2 = new Path2D()
  path2d2.moveTo(300, 200)
  path2d2.bezierCurveTo(350, 150, 400, 200, 300, 250)
  path2d2.bezierCurveTo(200, 200, 250, 150, 300, 200)

  let style = ctx!.createConicGradient(Math.PI / 4, 300, 200)
  style.addColorStop(0, 'red')
  style.addColorStop(0.5, 'pink')
  style.addColorStop(1, 'red')
  ctx!.fillStyle = style
  ctx!.fill(path2d2)

  let img = new Image()
  img.src = '../../../public/favicon.png'
  img.onload = () => {
    let pattern = ctx!.createPattern(img, 'no-repeat')
    ctx!.fillStyle = pattern!
    ctx!.fillRect(0, 0, 500, 500)
  }
})
</script>

<template>
  <ElScrollbar wrap-class="scroll-wrap-test">
    <!-- #region -->
    <ElBacktop target=".scroll-wrap-test" :right="80" :bottom="60" />
    <Eldrawer title="测试页面">
      <div>
        <el-divider content-position="center">返回首页</el-divider>
        <div class="w-full flex justify-center">
          <el-button @click="toHome">↩</el-button>
        </div>
      </div>
    </Eldrawer>
    <!-- #endregion -->
    <!-- 测试内容👇(随便写的乱七八糟的笔记这类) -->
    <canvas ref="canvas" width="500" height="500" />
    <svg>
      <path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black" />
    </svg>
    <svg>
      <path d="M 10 10 H 90 V 90 H 10 L 10 10" fill="transparent" stroke="black" />
    </svg>
    {{ foo }}
    <div class="w-28 h-28 dark:bg-[var(--bg-color)]"> </div>
    <el-button @click="test">test</el-button>
    <el-button @click="test2">test2</el-button>
    <el-button @click="test3">test3</el-button>
  </ElScrollbar>
</template>

<style scoped lang="scss">
.foo {
  // 如果有背景样式在,会覆盖主题的,所以要用原子化样式去写背景颜色在去主题切换
  background-color: #282727;
}
</style>
