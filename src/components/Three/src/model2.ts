import {
  Group
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import model from '../assets/Xbot.glb'

const mesh = new Group()

const loader = new GLTFLoader()
loader.load(model, (gltf) => {
  console.log('gltf :>> ', gltf)
  mesh.add(gltf.scene)
})

export { mesh }