import * as THREE from 'three'
import tile from '../assets/tile.jpg'

// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(90, -40, 60),
  new THREE.Vector3(120, 30, 30)
])
// 样条曲线path作为TubeGeometry参数生成管道
const geometry = new THREE.TubeGeometry(path, 200, 5, 30)
const texLoader = new THREE.TextureLoader()
//纹理贴图
const texture = texLoader.load(tile)
//UV坐标U方向阵列模式
texture.wrapS = THREE.RepeatWrapping
//纹理沿着管道方向阵列(UV坐标U方向)
texture.repeat.x = 10
const material = new THREE.MeshLambertMaterial({
  map: texture,
  side: THREE.DoubleSide //两面可见
})
const mesh = new THREE.Mesh(geometry, material)

const model = mesh
export { model, path }
