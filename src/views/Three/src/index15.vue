<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as TWEEN from '@tweenjs/tween.js'

import { model, mesh } from './model22'
scene.add(model)

// const pos = {x: 0,y: 0};
const tween = new TWEEN.Tween(model.position) //创建一段tween动画

// 经过2000毫秒，pos对象的x和y属性分别从零变化为100、50
tween.to({ x: 100, y: 50 }, 2000)
// tween动画开始执行
tween.start()

// 模型透明度的动画
new TWEEN.Tween({ opacity: mesh.material.opacity })
  .to({ opacity: 1.0 }, 3000)
  .onUpdate(function (obj) {
    mesh.material.opacity = obj.opacity
  })
  .start()

// 相机的动画
camera.position.set(202, 123, 125)
camera.lookAt(0, 0, 0)
new TWEEN.Tween(camera.position)
  .to({ x: 202, y: 123, z: 50 }, 3000)
  .onUpdate((obj) => {
    console.log('obj :>> ', obj)
    // 这样子保证相机注视位置不变
    // onStart：动画开始执行触发
    // onUpdate：动画执行过程中，一直被调用执行
    // onComplete：动画正常执行完触发
    // 里面有个obj参数对应new TWEEN.Tween()里的参数
    camera.lookAt(0, 0, 0)
  })
  .start()
  // 使用二次缓动函数(tween自带的动画函数)
  // easing函数：缓动算法(运动效果)
  // easing类型：定义缓动算法起作用地方
  // tween.easing(TWEEN.Easing.easing函数.easing类型)
  .easing(TWEEN.Easing.Quadratic.Out)
// 还有很多函数如下面
// 动画开始缓动方式(类比加速启动)
// .easing(TWEEN.Easing.Sinusoidal.In);
// 动画结束缓动方式(类比减速刹车)
// .easing(TWEEN.Easing.Sinusoidal.Out);
// 同时设置In和Out
// .easing(TWEEN.Easing.Sinusoidal.InOut);

// 相机圆周运动，且保持相机镜头对准坐标原点
// const R = 100; //相机圆周运动的半径
// new TWEEN.Tween({ angle: 0 })
//   .to({ angle: Math.PI * 2 }, 16000)
//   .onUpdate(function (obj) {
//     camera.position.x = R * Math.cos(obj.angle);
//     camera.position.z = R * Math.sin(obj.angle);
//     camera.lookAt(0, 0, 0);
//   })
//   .start()

function loop() {
  TWEEN.update() //tween更新
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
