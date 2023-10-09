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
// 这里应该要这样来加载完后再渲染一次,不然首次加载无法加载纹理,不过这里我分离模型了就麻烦修改了
// const texture = texLoader.load(earth, () => {
//   renderer.render(scene, camera)
// })

const geometry = new SphereGeometry(100)
// const geometry = new BoxGeometry(100, 100, 100)
const material = new MeshLambertMaterial({
  // 不要设置颜色,不然会混合
  map: texture
})
const mesh = new Mesh(geometry, material)

export { mesh }