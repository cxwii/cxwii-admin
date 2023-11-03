import * as THREE from 'three'

// 1
// const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
// const vertices = new Float32Array([
//     0, 0, 0, //顶点1坐标
//     50, 0, 0, //顶点2坐标
//     0, 25, 0, //顶点3坐标
// ]);
// // 顶点位置
// geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

// const colors = new Float32Array([
//   1, 0, 0, //顶点1颜色
//   0, 0, 1, //顶点2颜色
//   0, 1, 0, //顶点3颜色
// ]);
// // 设置几何体attributes属性的颜色color属性
// //3个为一组,表示一个顶点的颜色数据RGB
// geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

// // // 点渲染模式
// // const material = new THREE.PointsMaterial({
// //   // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
// //   vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
// //   size: 20.0, //点对象像素尺寸
// // });
// // const points = new THREE.Points(geometry, material); //点模型对象

// // 线渲染
// // const material = new THREE.LineBasicMaterial({
// //   vertexColors:true,//使用顶点颜色渲染
// // });
// // const line = new THREE.Line(geometry, material);

// // 网格渲染
// const material = new THREE.MeshBasicMaterial({
//   // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
//   vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
//   side: THREE.DoubleSide,
// });
// const mesh = new THREE.Mesh(geometry, material);

// 2
const geometry = new THREE.BufferGeometry() //创建一个几何体对象
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80)
])
const pointsArr = curve.getSpacedPoints(100) //曲线取点
geometry.setFromPoints(pointsArr) //pointsArr赋值给顶点位置属性

const pos = geometry.attributes.position
const count = pos.count //顶点数量
console.log('count :>> ', count)
// 计算每个顶点的颜色值
const colorsArr = []
for (let i = 0; i < count; i++) {
  const percent = i / count //点索引值相对所有点数量的百分比
  //根据顶点位置顺序大小设置颜色渐变
  // 红色分量从0到1变化，蓝色分量从1到0变化
  colorsArr.push(percent, 0, 1 - percent) //蓝色到红色渐变色

  // 上面那里是自己计算,可以用下面这种方便点
  // const c = c1.clone().lerp(c2, percent);
  // colorsArr.push(c)
}
//类型数组创建顶点颜色color数据
const colors = new Float32Array(colorsArr)
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

const material = new THREE.LineBasicMaterial({
  vertexColors: true //使用顶点颜色渲染
})
const line = new THREE.Line(geometry, material)

// 执行.lerpColors(Color1,Color2, percent)通过一个百分比参数percent
// 可以控制Color1和Color2两种颜色混合的百分比
// Color1对应1-percent，Color2对应percent。
// const c1 = new THREE.Color(0xff0000); //红色
// const c2 = new THREE.Color(0x0000ff); //蓝色
// const c = new THREE.Color();
// c.lerpColors(c1,c2, 0);
// console.log('颜色插值结果',c);
// c.lerpColors(c1,c2, 0.5);
// console.log('颜色插值结果',c);

// 两个差不多,只是有点语法不同
const c1 = new THREE.Color(0xff0000) //红色
const c2 = new THREE.Color(0x0000ff) //蓝色
c1.lerp(c2, 1)

const model = line
export { model }
