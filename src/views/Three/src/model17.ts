import * as THREE from 'three'
const model = new THREE.Group()

// // 1
// // 创建射线对象Ray
// const ray = new THREE.Ray()
// // 设置射线起点
// ray.origin = new THREE.Vector3(1,0,3)
// // 或者不用3维向量设置射线起点
// // ray.origin.set(1, 0, 3)

// // 注意.direction的值需要是单位向量
// // 不是的话可以执行.normalize()归一化或者说标准化
// // 单位向量就是下面这种沿xyz任意一条方向的
// // 表示射线沿着x轴正方向
// ray.direction = new THREE.Vector3(1,0,0)
// // 表示射线沿着x轴负方向
// // ray.direction = new THREE.Vector3(-1,0,0)
// // 表示射线沿着y方向
// // ray.direction = new THREE.Vector3(0,1,0)

// // 非单位向量
// // 表示射线沿着xy坐标轴的中间线
// // ray.direction = new THREE.Vector3(1,1,0).normalize()

// // 三角形三个点坐标
// const p1 = new THREE.Vector3(100, 25, 0)
// const p2 = new THREE.Vector3(100, -25, 25)
// const p3 = new THREE.Vector3(100, -25, -25)
// const point = new THREE.Vector3();//用来记录射线和三角形的交叉点
// // `.intersectTriangle()`计算射线和三角形是否相交叉
// // 相交返回交点，不相交返回null
// const result = ray.intersectTriangle(p1,p2,p3,false,point)
// console.log('交叉点坐标', point)
// console.log('查看是否相交', result)

// // .intersectTriangle()参数4表示是否进行背面剔除
// // 就是射线射到背面上不算相交
// const r = ray.intersectTriangle(p1,p2,p3,true,point);
// console.log('查看是否相交', r);

// 2
// 创建4个正方体
const geometry = new THREE.BoxGeometry(20, 20, 20)
const material = new THREE.MeshLambertMaterial({
  color: 0x00fff2
})
const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'mesh1'
geometry.translate(0, 50, 0)

const geometry2 = new THREE.BoxGeometry(20, 20, 20)
const material2 = new THREE.MeshLambertMaterial({
  color: 0x00fff2
})
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.name = 'mesh2'
geometry2.translate(50, 50, 0)

const geometry3 = new THREE.BoxGeometry(20, 20, 20)
const material3 = new THREE.MeshLambertMaterial({
  color: 0x00fff2
})
const mesh3 = new THREE.Mesh(geometry3, material3)
mesh3.name = 'mesh3'
geometry3.translate(0, 50, 50)

const geometry4 = new THREE.BoxGeometry(20, 20, 20)
const material4 = new THREE.MeshLambertMaterial({
  color: 0x00fff2
})
const mesh4 = new THREE.Mesh(geometry4, material4)
mesh4.name = 'mesh4'
geometry4.translate(50, 50, 50)
model.add(mesh, mesh2, mesh3, mesh4)

const meshs = model

export { mesh, meshs }
