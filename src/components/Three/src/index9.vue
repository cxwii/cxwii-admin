<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
const threeRef = ref()
const tagRef = ref()
nextTick(() => {
  // HTML元素转化为threejs的CSS2模型对象
  const tag = new CSS2DObject(tagRef.value)
  tag.position.set(50,0,50)
  scene.add(tag)
  // 创建一个CSS2渲染器CSS2DRenderer
  const renderer = new CSS2DRenderer()
  // width, height：canvas画布宽高度
  renderer.setSize(500, 500)
  // renderer.domElement会生成一个div包裹在外面,然后基本都是使用这个div来操控
  threeRef.value.appendChild(renderer.domElement)
  renderer.domElement.style.backgroundColor = 'grey'

  renderer.render(scene, camera)
  // 控制器
  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})

</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
  <div ref="tagRef">标签内容</div>
</template>

<style scoped lang="scss">

</style>