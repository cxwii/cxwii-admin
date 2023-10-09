<script lang="ts" setup>
import {
  Scene,
  AmbientLight,
  PerspectiveCamera,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ref, nextTick } from 'vue'
import { mesh } from './model'

const threeRef = ref()
const scene = new Scene()
// 导入的模型
scene.add(mesh)
const light = new AmbientLight(0x404040, 40)
scene.add(light)
const camera = new PerspectiveCamera(50, 1, 0.1, 2000)
camera.position.set(200, 200, 200)
camera.lookAt(mesh.position)
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