<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Horse from '../assets/Horse.glb'

const loader = new GLTFLoader()
const model = new THREE.Group()

let mixer: any = null
let clipAction: any = null

// 重新开始新动画
// clipAction.reset()

loader.load(Horse, (gltf: any) => {
  console.log('控制台查看gltf对象结构', gltf)
  console.log('动画数据', gltf.animations)

  // 访问人体网格模型
  const mesh = gltf.scene.children[0]
  console.log('mesh :>> ', mesh)
  // 获取所有变形目标的顶点数据
  const tArr = mesh.geometry.morphAttributes.position
  console.log('所有变形目标', tArr)
  console.log('所有权重', mesh.morphTargetInfluences)

  const clip = gltf.animations[0]
  const duration = clip.duration //默认持续时间
  // console.log('动画时间', duration);

  // 动画对应于材质，更换材质会导致动画的失效
  // gltf.scene.traverse((obj: any) => {
  //   if (obj.isMesh) {
  //     obj.material = new THREE.MeshLambertMaterial({
  //       color: 0x004444,
  //       transparent: true,
  //       opacity: 0.5,
  //     })
  //     const edges = new THREE.EdgesGeometry(obj.geometry)
  //     const edgesMaterial = new THREE.LineBasicMaterial({
  //       color: 0x00ffff,
  //     })
  //     const line = new THREE.LineSegments(edges, edgesMaterial)
  //     obj.add(line)
  //   }
  // })

  //包含帧动画的模型作为参数创建一个播放器
  mixer = new THREE.AnimationMixer(gltf.scene)
  //  获取gltf.animations[0]的第一个clip动画对象
  clipAction = mixer.clipAction(gltf.animations[0]) //创建动画clipAction对象
  // clipAction.play();//播放动画

  model.add(gltf.scene)
})

// 创建一个时钟对象Clock
const clock = new THREE.Clock()
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  if (mixer !== null) {
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新播放器相关的时间
    mixer.update(clock.getDelta())
  }
}
render()

const threeRef = ref()
nextTick(() => {
  scene.add(model)
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)
  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})

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
