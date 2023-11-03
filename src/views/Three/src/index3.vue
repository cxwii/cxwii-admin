<script lang="ts" setup>
import {
  Scene,
  AmbientLight,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  AxesHelper,
  SRGBColorSpace,
  PointLight,
  PointLightHelper,
  CubeTextureLoader
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ref, nextTick } from 'vue'
// import { mesh } from './model1'
// import { mesh } from './model2'
// import { mesh } from './model3'
import { mesh } from './model4'

// 环境贴图
import px from '../assets/px.png'
import nx from '../assets/nx.png'
import py from '../assets/py.png'
import ny from '../assets/ny.png'
import pz from '../assets/pz.png'
import nz from '../assets/nz.png'
const cubeTextureLoader = new CubeTextureLoader().load([px, nx, py, ny, pz, nz])

const threeRef = ref()
const scene = new Scene()

// 在scene中设置环境贴图
scene.environment = cubeTextureLoader

// 导入的模型
scene.add(mesh)
const gridHelper = new GridHelper(30, 50, 0x009999, 0x004444)
scene.add(gridHelper)
// 光源
// const light = new AmbientLight(0x404040, 4)
// scene.add(light)
const pointLight = new PointLight(0xffffff, 5, 0, 0)
pointLight.position.set(2, 2, 2)
scene.add(pointLight)
// const pointLightHelper = new PointLightHelper(pointLight, 0.1, 0x67c23a)
// scene.add(pointLightHelper)

const axesHelper = new AxesHelper(10)
scene.add(axesHelper)
const camera = new PerspectiveCamera(80, 1, 0.1, 2000)
camera.position.set(3, 3, 3)
camera.lookAt(mesh.position)
const renderer = new WebGLRenderer({
  // 解决深度冲突问题(两个位置相同的时候或者相近且相机位置足够远的时候模型出现闪烁)
  // 本质上是通过设置对数深度缓冲区来优化深度冲突问题
  // 有一点要注意，当两个面间隙过小，或者重合，你设置webgl渲染器对数深度缓冲区也是无效的
  // 所以还是给一点间隔才行
  logarithmicDepthBuffer: true,
  // 要下载必须打开这个
  preserveDrawingBuffer: true,
  // 背景透明(几种方法)
  alpha: true,
  antialias: true
})
// 背景透明(还有这两种方法)
// renderer.setClearAlpha(0.0)
// renderer.setClearColor(0xb9d3ff, 0.4)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(500, 500)
// 在引入外部模型的时候要设置对应的纹理颜色(现在默认值就是SRGBColorSpace)
// renderer.outputColorSpace = SRGBColorSpace
renderer.render(scene, camera)
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  const controls = new OrbitControls(camera, threeRef.value)
  // controls.target.set(0, 1.5, 0)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
    // console.log('相机位置 :>> ', camera.position)
  })
})

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
// render()

const download = () => {
  const link = document.createElement('a')
  const canvas = renderer.domElement
  link.href = canvas.toDataURL('image/png')
  link.download = 'three.png'
  link.click()
}
</script>

<template>
  <div class="relative">
    <button @click="download" class="absolute z-index-10 top-20">下载</button>
    <div style="width: 50px; height: 50px; background-color: rgb(250, 7, 48)">123</div>
    <div ref="threeRef" class="h-full w-full absolute top-0"></div>
  </div>
</template>

<style scoped lang="scss"></style>
