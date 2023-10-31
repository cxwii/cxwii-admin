<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { model, Bone1, Bone2 } from './model20'
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
  requestAnimationFrame(loop);
  renderer.render(scene, camera)
}
loop();

const gui = new GUI();
gui.add(Bone1.rotation, 'x', 0, Math.PI / 3).name('关节1');
gui.add(Bone2.rotation, 'x', 0, Math.PI / 3).name('关节2');
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>