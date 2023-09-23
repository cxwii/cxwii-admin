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
  LineSegments,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  MeshLambertMaterial,
  PointLight
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// #region
// 创建一个空的几何体顶点对象
const geometry = new BufferGeometry()

// 类型化数组(Float32Array)创建顶点数据
// three规定只能用Float32Array来创建
const vertices = new Float32Array([
    0, 0, 0, // 顶点1坐标
    80, 0, 0, // 顶点2坐标
    80, 80, 0, // 顶点3坐标
    0, 80, 0, // 顶点4坐标
])

// 创建属性缓冲对象顶点数据
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new BufferAttribute(vertices, 3)

// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue
// #endregion

// #region (1)
// // 点模型
// const material = new PointsMaterial({
//     color: 0xffff00,
//     size: 10.0 // 点对象像素尺寸
// })
// // 点模型对象
// const model = new Points(geometry, material)

// // 线模型
// const material = new LineBasicMaterial({
//     color: 0xff0000
// })
// const model = new Line(geometry, material)
// 闭合线条
// const model = new LineLoop(geometry, material)
// 非连续的线条
// const model = new LineSegments(geometry, material)
// #endregion

// #region (2)
// 类型化数组创建顶点数据(用顶点分组的方式来提高性能的简易性)
const indexes = new Uint16Array([
  0, 1, 2,
  0, 2, 3
])

geometry.index = new BufferAttribute(indexes, 1)

// 法线
const normals = new Float32Array([
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1
])
geometry.attributes.normal = new BufferAttribute(normals, 3)

// MeshLambertMaterial(使用漫反射材质情况下,不设置法线即使有光源也无法看见物体)
const material = new MeshLambertMaterial({
    color: 0x0000ff,
    side: DoubleSide,
    wireframe: true
})
// 网格模型都是三个点组成一个三角形,然后由众多三角形组成物体
const model = new Mesh(geometry, material)
// #endregion

// #region
// 挂载各种内容
const threeRef = ref()
const scene = new Scene()
scene.add(model) // 模型有改变就改这个就可以了
const axesHelper = new AxesHelper(100)
scene.add(axesHelper)
const pointLight = new PointLight(0xffffff, 5, 0, 0)
pointLight.position.set(150, 110, 80)
scene.add(pointLight)
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
// #endregion
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss">

</style>