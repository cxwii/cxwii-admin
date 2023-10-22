<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { points } from './model5'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

scene.add(points)

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

<style scoped lang="scss">

</style>