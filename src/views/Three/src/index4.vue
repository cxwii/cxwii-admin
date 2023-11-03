<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { model } from './model5'
// import { model, points } from './model6'
// import { model } from './model7'
// import { model } from './model8'
// import { model } from './model9'
// import { model } from './model10'
import { model } from './model11'

scene.add(model)
// scene.add(points)

const threeRef = ref()
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
