import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import ferrari from '../assets/ferrari.glb'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/public/draco/')
loader.setDRACOLoader(dracoLoader)
const model = new THREE.Group()
loader.load(ferrari, function (gltf) {
  gltf.scene.traverse(function (obj: any) {
    if (obj.isMesh) {
      obj.material = new THREE.MeshLambertMaterial({
        color: 0x004444,
        transparent: true,
        opacity: 0.5
      })
      const edges = new THREE.EdgesGeometry(obj.geometry)
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff
      })
      const line = new THREE.LineSegments(edges, edgesMaterial)
      obj.add(line)
    }
  })
  model.add(gltf.scene)

  // 计算模型包围盒
  const box3 = new THREE.Box3()
  box3.expandByObject(model)
  console.log('查看包围盒', box3)

  // getSize()计算包围盒尺寸
  // 获得包围盒长宽高尺寸，结果保存在参数三维向量对象scale中
  const scale = new THREE.Vector3()
  box3.getSize(scale)
  console.log('模型包围盒尺寸', scale)

  // 计算包围盒中心坐标
  const center = new THREE.Vector3()
  box3.getCenter(center)
  console.log('模型中心坐标', center)

  // 包围盒
  const geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z)
  const material = new THREE.MeshLambertMaterial({
    color: 0x004444,
    transparent: true,
    opacity: 0.5
  })
  const mesh = new THREE.Mesh(geometry, material)
  const edges = new THREE.EdgesGeometry(geometry)
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff
  })
  const line = new THREE.LineSegments(edges, edgesMaterial)
  mesh.add(line)
  mesh.position.set(center.x, center.y, center.z)
  model.add(mesh)
})

export { model }
