import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Xbot from '../assets/Xbot.glb'
const model = new THREE.Group()
const loader = new GLTFLoader()

let mixer: any = null
let clipAction6: any = null
let clipAction3: any = null
let clipAction2: any = null
loader.load(Xbot, (gltf: any) => {
  console.log('控制台查看gltf对象结构', gltf)
  console.log('动画 :>> ', gltf.animations)
  model.add(gltf.scene)
  // 骨骼辅助显示
  const skeletonHelper = new THREE.SkeletonHelper(gltf.scene)
  model.add(skeletonHelper)
  // 获取骨骼
  const bones = gltf.scene.getObjectByName('Beta_Surface')
  console.log('SkinnedMesh :>> ', bones)
  console.log('骨骼 :>> ', bones.skeleton.bones)
  // 获取左手
  const LeftForeArm = gltf.scene.getObjectByName('mixamorigLeftArm')
  // LeftForeArm.rotation.z = -Math.PI / 4

  mixer = new THREE.AnimationMixer(gltf.scene)
  clipAction6 = mixer.clipAction(gltf.animations[6])
  clipAction3 = mixer.clipAction(gltf.animations[3])
  clipAction2 = mixer.clipAction(gltf.animations[2])
})

export { model, mixer, clipAction6, clipAction3, clipAction2 }
