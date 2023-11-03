import { Group, MeshPhysicalMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 一些glb文件进行过压缩需要这样使用它去解码
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import model from '../assets/ferrari.glb'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const mesh = new Group()
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('/public/draco/')
loader.setDRACOLoader(dracoLoader)

// 清漆pbr材质
const meshPhongMaterial = new MeshPhysicalMaterial({
  // color: 0x3393f3,
})

// const gui = new GUI()
// const material = gui.addFolder('材质')
// material.add(
//   meshPhongMaterial,
//   'metalness',
//   0, 1
// ).name('金属度')
// material.add(
//   meshPhongMaterial,
//   'roughness',
//   0, 1
// ).name('粗糙度')
// material.add(
//   meshPhongMaterial,
//   'envMapIntensity',
//   0, 10
// ).name('影响度')
// material.add(
//   meshPhongMaterial,
//   'envMapIntensity',
//   0, 10
// ).name('清漆度')
// material.add(
//   meshPhongMaterial,
//   'envMapIntensity',
//   0, 10
// ).name('清漆粗糙度')
// material.add(
//   meshPhongMaterial,
//   'transmission',
//   0, 1
// ).name('透光率')
// material.add(
//   meshPhongMaterial,
//   'ior',
//   1, 2.333
// ).name('透光率')

// any大法好(正规写法应该是想model2里面那样标好类型的,因为太麻烦就先any吧)
loader.load(
  model,
  (gltf: any) => {
    mesh.add(gltf.scene)
    // console.log('object :>> ', gltf.scene.getObjectByName('body'))
    // meshPhongMaterial.color = gltf.scene.getObjectByName('body').material.color
    // gltf.scene.getObjectByName('body').material = meshPhongMaterial
    meshPhongMaterial.color = gltf.scene.getObjectByName('glass').material.color
    gltf.scene.getObjectByName('glass').material = meshPhongMaterial
  },
  (xhr) => {
    // console.log('xhr :>> ', xhr);
    // console.log('加载进度 :>> ', xhr.loaded / xhr.total);
  }
)

export { mesh }
