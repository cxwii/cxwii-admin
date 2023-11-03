<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { model, mesh } from './model19'
scene.add(model)

const threeRef = ref()
nextTick(() => {
  // 创建变形动画权重系数的关键帧数据
  // 设置变形目标1对应权重随着时间的变化
  const KF1 = new THREE.KeyframeTrack('Box.morphTargetInfluences[0]', [0, 5], [0, 1])
  // 设置变形目标2对应权重随着时间的变化
  const KF2 = new THREE.KeyframeTrack('Box.morphTargetInfluences[1]', [5, 10], [0, 1])
  // 创建一个剪辑clip对象
  const clip = new THREE.AnimationClip('t', 10, [KF1, KF2])

  // 播放变形动画
  const mixer = new THREE.AnimationMixer(model)
  const clipAction = mixer.clipAction(clip)
  // clipAction.play();
  clipAction.loop = THREE.LoopOnce //不循环播放
  clipAction.clampWhenFinished = true // 物体状态停留在动画结束的时候

  const clock = new THREE.Clock()

  function loop() {
    requestAnimationFrame(loop)
    renderer.render(scene, camera)
    const frameT = clock.getDelta()
    // 更新播放器时间
    mixer.update(frameT)
  }
  loop()

  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })

  // 用gui来控制
  // 动画的本质就是权重的变化和变形
  // const gui = new GUI();
  // const obj = {
  //   t0: 0,
  //   t1: 0,
  // }
  // gui.add(obj, 't0', 0, 1).name('变高').onChange(function (v) {
  //   mesh.morphTargetInfluences![0] = v;
  // });
  // gui.add(obj, 't1', 0, 1).name('变细').onChange(function (v) {
  //   mesh.morphTargetInfluences![1] = v;
  // });
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
