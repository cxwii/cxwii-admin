<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const threeRef = ref()

import { model } from './model9'
scene.add(model)

// 正投影相机
// 和透视投影相机的区别就在于它不会透视,怎么拉大都是实体不能透过
// left和bottom要负数
const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 2000)
camera.position.set(10, 10, 10)
camera.lookAt(0, 0, 0)

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