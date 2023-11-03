import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import ferrari from '../assets/ferrari.glb'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/public/draco/')
loader.setDRACOLoader(dracoLoader)
// 1
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const material = new THREE.MeshLambertMaterial({
//     color: 0x004444,
//     transparent:true,
//     opacity:0.5,
// });

// // 圆柱
// // const geometry = new THREE.CylinderGeometry(60, 60, 100, 30)

// const mesh = new THREE.Mesh(geometry, material);

// // 长方体作为EdgesGeometry参数创建一个新的几何体
// // 实际上就是拷贝一个相同模型,然后给他描边
// const edges = new THREE.EdgesGeometry(geometry);
// // 给圆柱描边的时候相邻面法线夹角大于30度，才会显示线条
// // const edges = new THREE.EdgesGeometry(geometry, 30);
// const edgesMaterial = new THREE.LineBasicMaterial({
//   color: 0x00ffff,
// })
// const line = new THREE.LineSegments(edges, edgesMaterial);
// mesh.add(line);

// const model = mesh

// 2给模型设置描边
const model = new THREE.Group()
loader.load(ferrari, function (gltf) {
  // 递归遍历设置每个模型的材质，同时设置每个模型的边线
  gltf.scene.traverse(function (obj: any) {
    if (obj.isMesh) {
      // 模型材质重新设置
      obj.material = new THREE.MeshLambertMaterial({
        color: 0x004444,
        transparent: true,
        opacity: 0.5
      })
      // 模型边线设置
      const edges = new THREE.EdgesGeometry(obj.geometry)
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff
      })
      const line = new THREE.LineSegments(edges, edgesMaterial)
      obj.add(line)
    }
  })
  model.add(gltf.scene)
})

export { model }
