import {
  SphereGeometry,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  TextureLoader,
  BufferGeometry,
  BufferAttribute,
  PlaneGeometry,
  RepeatWrapping
} from 'three'
import earth from '../assets/earth.jpeg'
import tile from '../assets/tile.jpg'
import swerve from '../assets/swerve.png'

// #region
// 纹理加载
const texLoader = new TextureLoader()
const texture = texLoader.load(earth)

// // 这样子就能重复循环一张纹理图片(可用作于动画)
// // 一些简单的重复图形还可以通过先阵列后重复的方式来节省像素大小(texture.repeat.x = 50)
// texture.wrapS = RepeatWrapping
// texture.offset.x += 0.5

// 这里应该要这样来加载完后再渲染一次,不然首次加载无法加载纹理,不过这里我分离模型了就麻烦修改了
// const texture = texLoader.load(earth, () => {
//   renderer.render(scene, camera)
// })

// 球形模型
// const geometry = new SphereGeometry(100)

// 长方体模型
// const geometry = new BoxGeometry(100, 100, 100)

// 长方形模型
const geometry = new BufferGeometry()
const vertices = new Float32Array([
  0,
  0,
  0, // 顶点1坐标
  160,
  0,
  0, // 顶点2坐标
  160,
  80,
  0, // 顶点3坐标
  0,
  80,
  0 // 顶点4坐标
])
const attribue = new BufferAttribute(vertices, 3)
geometry.attributes.position = attribue
const indexes = new Uint16Array([0, 1, 2, 0, 2, 3])
geometry.index = new BufferAttribute(indexes, 1)
const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1])
geometry.attributes.normal = new BufferAttribute(normals, 3)
// 设置uv顶点(0~1)
const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
geometry.attributes.uv = new BufferAttribute(uvs, 2)

const material = new MeshLambertMaterial({
  // 不要设置颜色,不然会混合
  map: texture
})
// #endregion

// #region
const texLoader2 = new TextureLoader()
const texture2 = texLoader2.load(tile)
texture2.wrapS = RepeatWrapping
texture2.wrapT = RepeatWrapping
texture2.repeat.set(12, 12)

const geometry2 = new PlaneGeometry(2000, 2000)
const material2 = new MeshLambertMaterial({
  // 不要设置颜色,不然会混合
  map: texture2
})
// #endregion

// #region
const texLoader3 = new TextureLoader()
const texture3 = texLoader3.load(swerve)

const geometry3 = new PlaneGeometry(60, 60)
const material3 = new MeshLambertMaterial({
  // 不要设置颜色,不然会混合
  map: texture3,
  // 这个在一些透明背景的图片时要设置,背景才能透明
  transparent: true
})
// #endregion

const mesh = new Mesh(geometry, material)

// const mesh = new Mesh(geometry2, material2)
// mesh.rotateX(-Math.PI/2)

// const mesh = new Mesh(geometry3, material3)

export { mesh }
