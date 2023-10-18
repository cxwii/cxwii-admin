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
const cubeTextureLoader =  new CubeTextureLoader()
.load([px, nx, py, ny, pz, nz])

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
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss">
</style>