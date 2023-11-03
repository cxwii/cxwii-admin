import { Mesh, BoxGeometry, MeshStandardMaterial, CubeTextureLoader } from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import model from '../assets/Xbot.glb'

// 环境贴图的情况可以直接给scene设置这样更方便
// import px from '../assets/px.png'
// import nx from '../assets/nx.png'
// import py from '../assets/py.png'
// import ny from '../assets/ny.png'
// import pz from '../assets/pz.png'
// import nz from '../assets/nz.png'

// const cubeTextureLoader =  new CubeTextureLoader()
// .load([px, nx, py, ny, pz, nz])

const geometry = new BoxGeometry(1, 1, 1)

const material = new MeshStandardMaterial({
  color: 0x3393f3,
  // 环境贴图(环境贴图还提供了一个相当于光源的影响,可以不设置光源也有光)
  // envMap: cubeTextureLoader,
  // 环境贴图对物体表面的影响度(0就相当于没有环境贴图)
  envMapIntensity: 1,
  // 金属度
  metalness: 1.0,
  // 表面粗糙度(0就几乎相当于镜子了,完全镜面反射)
  roughness: 0
})

const mesh = new Mesh(geometry, material)

export { mesh }
