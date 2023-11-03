<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { model, mixer, clipAction6, clipAction3, clipAction2 } from './model21'
scene.add(model)

camera.position.set(3, 3, 3)
const threeRef = ref()
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })

  // 权重会影响动画
  // clipAction2.weight = 1.0
  // clipAction3.weight = 0.0
  // clipAction6.weight = 0.0
  // clipAction2.play()
  clipAction6.play()
  // clipAction3.play()
})

const clock = new THREE.Clock()
const loop = () => {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
  const frameT = clock.getDelta()
  mixer.update(frameT)
}
loop()
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
