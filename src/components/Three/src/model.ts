import {
  SphereGeometry,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  TextureLoader
} from 'three'
import earth from '../assets/earth.jpeg'

// 纹理加载
const texLoader = new TextureLoader()
const texture = texLoader.load(earth)

const geometry = new SphereGeometry(100)
// const geometry = new BoxGeometry(100, 100, 100)
const material = new MeshLambertMaterial({
  // 不要设置颜色,不然会混合
  map: texture
})
const mesh = new Mesh(geometry, material)

export { mesh }