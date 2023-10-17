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
  PointLightHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ref, nextTick } from 'vue'
import { mesh } from './model2'

const threeRef = ref()
const scene = new Scene()
// 导入的模型
scene.add(mesh)
const gridHelper = new GridHelper(30, 50, 0x009999, 0x004444)
scene.add(gridHelper)
// 光源
const light = new AmbientLight(0x404040, 4)
scene.add(light)
const pointLight = new PointLight(0xffffff, 5, 0, 0)
pointLight.position.set(2, 2, 2)
scene.add(pointLight)
const pointLightHelper = new PointLightHelper(pointLight, 0.1, 0x67c23a)
scene.add(pointLightHelper)

const axesHelper = new AxesHelper(10)
scene.add(axesHelper)
const camera = new PerspectiveCamera(80, 1, 0.1, 2000)
camera.position.set(0, 1.5, 3)
camera.lookAt(0, 1.5, 0)
const renderer = new WebGLRenderer({
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(500, 500)
// 在引入外部模型的时候要设置对应的纹理颜色(现在默认值就是SRGBColorSpace)
// renderer.outputColorSpace = SRGBColorSpace
renderer.render(scene, camera)
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  const controls = new OrbitControls(camera, threeRef.value)
  controls.target.set(0, 1.5, 0)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
    // console.log('相机位置 :>> ', camera.position)
  })
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss">
</style>