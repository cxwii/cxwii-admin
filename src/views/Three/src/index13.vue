<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { model, Bone1, Bone2, Bone3, Bone4, Bone5 } from './model20'
scene.add(model)

const threeRef = ref()
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})

function loop() {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
}
loop()

const gui = new GUI()
gui.add(Bone1.rotation, 'x', 0, Math.PI / 3).name('关节1')
gui.add(Bone2.rotation, 'x', 0, Math.PI / 3).name('关节2')
gui.add(Bone3.rotation, 'x', 0, Math.PI / 3).name('关节3')

gui.add(Bone1.position, 'x', 0, 50).name('Bone1x')
gui.add(Bone1.position, 'y', 0, 50).name('Bone1y')
gui.add(Bone1.position, 'z', 0, 50).name('Bone1z')

gui.add(Bone2.position, 'x', 0, 50).name('Bone2x')
gui.add(Bone2.position, 'y', 0, 50).name('Bone2y')
gui.add(Bone2.position, 'z', 0, 50).name('Bone2z')

gui.add(Bone3.position, 'x', 0, 50).name('Bone3x')
gui.add(Bone3.position, 'y', 0, 50).name('Bone3y')
gui.add(Bone3.position, 'z', 0, 50).name('Bone3z')

gui.add(Bone4.position, 'x', 0, 50).name('Bone4x')
gui.add(Bone4.position, 'y', 0, 50).name('Bone4y')
gui.add(Bone4.position, 'z', 0, 50).name('Bone4z')

gui.add(Bone5.position, 'x', 0, 50).name('Bone5x')
gui.add(Bone5.position, 'y', 0, 50).name('Bone5y')
gui.add(Bone5.position, 'z', 0, 50).name('Bone5z')
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
