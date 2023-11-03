import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  LineLoop,
  Line,
  Vector3,
  Vector2,
  EllipseCurve,
  PointsMaterial,
  Points,
  ArcCurve
} from 'three'

const geometry = new BufferGeometry()
// 圆弧半径
const R = 10
// 分段数量
const N = 50
// 两个相邻点间隔弧度
const sp = (2 * Math.PI) / N
// 半圆弧
// const sp = 1 * Math.PI / N

// 批量生成圆弧上的顶点数据
const arr = []

// 设置圆心坐标
// const cx = 20
// const cy = 10

// for (let i = 0; i < N+1; i++) {
//   const angle = sp * i;//当前点弧度
//   const x = cx + R * Math.cos(angle);
//   const y = cy + R * Math.sin(angle);
//   arr.push(x, y, 0);
// }

for (let i = 0; i < N; i++) {
  // 当前点弧度
  const angle = sp * i
  // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
  const x = R * Math.cos(angle)
  const y = R * Math.sin(angle)
  arr.push(x, y, 0)
}

// 类型数组创建顶点数据
const vertices = new Float32Array(arr)

// 创建属性缓冲区对象
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new BufferAttribute(vertices, 3)
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue

// 线材质
const material = new LineBasicMaterial({
  color: 0xff0000 //线条颜色
})
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// 使用Line渲染圆弧线会有一个缺口，不完全闭合，使用LineLoop可以封闭最后缺口。
// 或者多循环一段
// const line = new Line(geometry, material);
// const line = new LineLoop(geometry, material)//线条模型对象

// const pointsArr = [
//   // 三维向量Vector3表示的坐标值
//   new Vector3(0,0,0),
//   new Vector3(0,100,0),
//   new Vector3(0,100,100),
//   new Vector3(0,0,100),
// ]

// const pointsArr = [
//   // 三维向量Vector2表示的坐标值
//   new Vector2(0,0),
//   new Vector2(100,0),
//   new Vector2(100,100),
//   new Vector2(0,100),
// ];

// // 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
// geometry.setFromPoints(pointsArr);
// console.log('几何体变化',geometry.attributes.position);

// 椭圆
// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
const arc = new EllipseCurve(0, 0, 10, 5)
// const arc = new ArcCurve(0, 0, 10, 0, Math.PI/2)

//getPoints是基类Curve的方法，平面曲线会返回一个vector2对象作为元素组成的数组

// 通过.getSpacedPoints()和.getPoints()一样也可以从曲线Curve上返回一系列曲线上的顶点坐标。
// 通过.getSpacedPoints()是按照曲线长度等间距返回顶点数据
// .getPoints()获取点的方式并不是按照曲线等间距的方式
// 而是会考虑曲线斜率变化
// 斜率变化快的位置返回的顶点更密集。

// const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点
const pointsArr = arc.getSpacedPoints(50)

console.log('曲线上获取坐标', pointsArr)

const geometry2 = new BufferGeometry()
geometry2.setFromPoints(pointsArr)

// 点材质
const material2 = new PointsMaterial({
  color: 0xffff00,
  size: 1 //点对象像素尺寸
})
// 点模型
const model = new Points(geometry2, material2)
export { model }
