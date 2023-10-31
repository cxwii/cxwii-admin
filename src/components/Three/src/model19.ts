import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Horse from '../assets/Horse.glb'

const loader = new GLTFLoader()
const model = new THREE.Group()

loader.load(Horse, (gltf) => {
  console.log('控制台查看gltf对象结构', gltf)
  console.log('动画数据', gltf.animations)
  
  model.add(gltf.scene)
})

export { model }