<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { model } from './model15'
scene.add(model)

// 正投影摄像机验证精灵图
// const s = 0.6;//控制left, right, top, bottom范围大小
// const k = 1
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
// camera.position.set(10, 10, 10)
// camera.lookAt(0, 0, 0)

// 雨滴下落动画
// 相机在下雨的场景中，相机会渲染near~far范围的Sprite
// 距离相机0~near范围不会渲染，小部分Sprite会在相机镜头前经过
// 大家都知道透视投影远小近大，这时候相机near附近雨滴Sprite会显示比较大
// 你可以把near调整大一些，这样距离相机非常近的Sprite不会渲染。

// 周期性的动画
// const loop = () => {
//   // loop()每次执行都会更新雨滴的位置，进而产生动画效果
//   model.children.forEach(sprite => {
//       // 雨滴的y坐标每次减1
//       sprite.position.y -= 1;
//       if (sprite.position.y < 0) {
//           // 如果雨滴落到地面，重置y，从新下落
//           sprite.position.y = 600;
//       }
//   });
//   renderer.render(scene, camera)
//   requestAnimationFrame(loop);
// }
// 根据时间间隔的动画(这种效果更好)
const clock = new THREE.Clock()
const loop = () => {
  // loop()两次执行时间间隔
  const t = clock.getDelta()
  model.children.forEach((sprite) => {
    // 雨滴的y坐标每次减t*60
    sprite.position.y -= t * 60
    if (sprite.position.y < 0) {
      sprite.position.y = 600
    }
  })
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

loop()

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
