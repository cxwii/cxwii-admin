import * as THREE from 'three'
import raindrop from '../assets/raindrop.png'

const model = new THREE.Group()

// 1
// const texture = new THREE.TextureLoader().load(tile)
// // 创建精灵材质对象SpriteMaterial
// // 网格材质.transparent属性默认是false
// // 如果贴图是背景透明的png贴图，需要把.transparent设置为true
// // 对于SpriteMaterial而言，.transparent默认是true。
// const spriteMaterial = new THREE.SpriteMaterial({
//   // color:0x00ffff,//设置颜色
//   rotation:Math.PI/4,//旋转精灵对象45度，弧度值
//   map: texture, // 贴图纹理
// });

// // 创建精灵模型对象，不需要几何体geometry参数
// const sprite = new THREE.Sprite(spriteMaterial);

// // 控制精灵大小
// console.log('sprite.scale',sprite.scale);
// sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以,没有z

// // sprite.position设置精灵模型在三维空间中的位置坐标
// sprite.position.set(0,50,0);

// 2
const texture = new THREE.TextureLoader().load(raindrop)
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture
})

// 循环随机生成雨滴
for (let i = 0; i < 16000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial)
  model.add(sprite)
  sprite.scale.set(1, 1, 1)
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5)
  const y = 600 * Math.random()
  const z = 1000 * (Math.random() - 0.5)
  sprite.position.set(x, y, z)
}

export { model }
