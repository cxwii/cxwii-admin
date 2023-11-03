<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { model } from './model18'
scene.add(model)

// 数据有修改测试,注释写的数据不同是正常情况
// 给名为Box的模型对象的设置关键帧数据KeyframeTrack
const times = [0, 3, 6, 9] //时间轴上，设置三个时刻0、3、6秒
// times中三个不同时间点，物体分别对应values中的三个xyz坐标
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100, 0, 0, 0]

// 创建关键帧，把模型位置和时间对应起来
// 参数1是一个字符串，字符串内容是模型对象的名字.属性构成
// 比如mesh.position表示模型位置
// 比如mesh.material.color表示模型颜色
// 参数2是时间轴上取的几个关键帧时间点
// 参数3是时间点对应的物体状态。
// 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
// 一定要先给模型命名.我这里在model18那边就命名了
const posKF = new THREE.KeyframeTrack('mesh.position', times, values)
// 从2秒到5秒，物体从红色逐渐变化为蓝色
// 1, 0, 0红色到0, 0, 1蓝色
const colorKF = new THREE.KeyframeTrack(
  'mesh.material.color',
  [0, 5, 9],
  [1, 0, 0, 0, 0, 1, 1, 0, 0]
)

// 创建一个clip关键帧动画对象，命名"test"，动画持续时间6s
// AnimationClip包含的所有关键帧数据都放到参数3数组中即可
const clip = new THREE.AnimationClip('test', 9, [posKF, colorKF])

//包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
// 可以直接将一个Group作为参数
const mixer = new THREE.AnimationMixer(model)

//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const clipAction = mixer.clipAction(clip)

//不循环播放
clipAction.loop = THREE.LoopOnce

// 物体状态停留在动画结束的时候
// 这时候就停留在红色而不是变回青色
clipAction.clampWhenFinished = true

// //AnimationAction设置开始播放时间：从1秒时刻对应动画开始播放
// clipAction.time = 1;
// //AnimationClip设置播放结束时间：到5秒时刻对应的动画状态停止
// clip.duration = 5;

const threeRef = ref()
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})

const clock = new THREE.Clock()
const loop = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
  //clock.getDelta()方法获得loop()两次执行时间间隔
  const frameT = clock.getDelta()
  // 更新播放器相关的时间
  mixer.update(frameT)
}
loop()

const play = () => {
  //.play()控制动画播放，默认循环播放
  clipAction.play()
}

const stop = () => {
  //动画停止结束，回到开始状态,不是暂停
  clipAction.stop()
}

const pausedRef = ref('paused')
const paused = () => {
  // AnimationAction.paused默认值false，设置为true，可以临时暂停动画
  if (clipAction.paused) {
    //暂停状态
    clipAction.paused = false //切换为播放状态
    pausedRef.value = 'paused' // 如果改变为播放状态，按钮文字设置为“暂停”
  } else {
    //播放状态
    clipAction.paused = true //切换为暂停状态
    pausedRef.value = 'continue' // 如果改变为暂停状态，按钮文字设置为“继续”
  }
}

const previous = () => {
  clipAction.time -= 0.1
}

const nextRef = () => {
  clipAction.time += 0.1
}

// const gui = new GUI()
// // 0~6倍速之间调节
// // 0就暂停了
// gui.add(clipAction, 'timeScale', 0, 6);
// //在暂停情况下，设置.time属性,把动画定位在任意时刻
// gui.add(clipAction, 'time', 0, 9).step(0.1);
</script>

<template>
  <div ref="threeRef" class="h-auto w-auto"></div>
  <el-button @click="play">play</el-button>
  <el-button @click="stop">stop</el-button>
  <el-button @click="paused">{{ pausedRef }}</el-button>
  <el-button @click="previous">previous</el-button>
  <el-button @click="nextRef">nextRef</el-button>
</template>

<style scoped lang="scss"></style>
