import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import collisionWorld from '../assets/collisionWorld.glb'
const loader = new GLTFLoader()
const model = new THREE.Group()

// loader.load(collisionWorld, function (gltf: any) { //gltf加载成功后返回一个对象
//   //mesh表示地形网格模型
//   const mesh = gltf.scene.children[0];
//   // 顶点数据
//   const att = mesh.geometry.attributes;
//   console.log('att', att);
//   // 顶点位置数据
//   const pos = mesh.geometry.attributes.position;
//   console.log('pos', pos);

//   console.log('index', mesh.geometry.index);

//   const count = pos.count; //几何体顶点数量
//   console.log('count', count);

//   console.log('x', pos.getX(0));
//   // pos.setX(0,1000);

//   model.add(gltf.scene); //三维场景添加到model组对象中
// })

// 批量修改位置
// loader.load(collisionWorld, function (gltf: any) {
//   model.add(gltf.scene);
//   //mesh表示地形网格模型
//   const mesh = gltf.scene.children[0];
//   // 顶点位置数据
//   const pos = mesh.geometry.attributes.position;
//   const count = pos.count; //几何体顶点数量
//   // 批量设置所有几何体顶点位置的y坐标
//   for (let i = 0; i < count; i++) {
//       const y = pos.getY(i);//获取第i+1个顶点y坐标
//       pos.setY(i,y*2)//设置第i+1个顶点y坐标为自身2倍
//   }
// })

// 根据高度上色
loader.load(collisionWorld, function (gltf: any) {
  const mesh = gltf.scene.children[0]
  const pos = mesh.geometry.attributes.position
  const count = pos.count

  // 1. 计算模型y坐标高度差
  const yArr = [] //顶点所有y坐标，也就是地形高度
  for (let i = 0; i < count; i++) {
    yArr.push(pos.getY(i)) //获取顶点y坐标，也就是地形高度
  }
  yArr.sort() //数组元素排序，从小到大
  const miny = yArr[0] //y最小值
  const maxy = yArr[yArr.length - 1] //y最大值
  const height = maxy - miny //山脉整体高度

  // 2. 计算每个顶点的颜色值
  const colorsArr = []
  const c1 = new THREE.Color(0x0000ff) //山谷颜色
  const c2 = new THREE.Color(0xff0000) //山顶颜色
  for (let i = 0; i < count; i++) {
    //当前高度和整体高度比值
    const percent = (pos.getY(i) - miny) / height
    const c = c1.clone().lerp(c2, percent) //颜色插值计算
    colorsArr.push(c.r, c.g, c.b)
  }
  const colors = new Float32Array(colorsArr)
  // 设置几何体attributes属性的颜色color属性
  mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

  // 3. 设置材质，使用顶点颜色渲染
  mesh.material = new THREE.MeshLambertMaterial({
    vertexColors: true
  })

  model.add(gltf.scene)
})

export { model }
