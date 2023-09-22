<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  AxesHelper,
  LineBasicMaterial,
  Line,
  LineLoop,
  LineSegments
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建一个空的几何体顶点对象
const geometry = new BufferGeometry()

// 类型化数组(Float32Array)创建顶点数据
// three规定只能用Float32Array来创建
const vertices = new Float32Array([
    0, 0, 0, // 顶点1坐标
    50, 0, 0, // 顶点2坐标
    0, 100, 0, // 顶点3坐标
    0, 0, 10, // 顶点4坐标
    0, 0, 100, // 顶点5坐标
    50, 0, 10 // 顶点6坐标
])

// 创建属性缓冲对象顶点数据
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new BufferAttribute(vertices, 3)

// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue




// // 点模型
// const material = new PointsMaterial({
//     color: 0xffff00,
//     size: 10.0 // 点对象像素尺寸
// })
// // 点模型对象
// const model = new Points(geometry, material)

// 线模型
const material = new LineBasicMaterial({
    color: 0xff0000
})
const model = new Line(geometry, material)
// 闭合线条
// const model = new LineLoop(geometry, material)
// 非连续的线条
// const model = new LineSegments(geometry, material)






// 挂载各种内容
const threeRef = ref()
const scene = new Scene()
scene.add(model) // 模型有改变就改这个就可以了
const axesHelper = new AxesHelper(100)
scene.add(axesHelper)
const camera = new PerspectiveCamera(50, 1, 0.1, 2000)
camera.position.set(200, 200, 200)
camera.lookAt(model.position)
const renderer = new WebGLRenderer({
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(500, 500)
renderer.render(scene, camera)
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss">

</style>