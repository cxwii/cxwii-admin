import {
  Vector3,
  Vector2,
  CatmullRomCurve3,
  BufferGeometry,
  LineBasicMaterial,
  Line,
  SplineCurve,
  QuadraticBezierCurve,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  LineCurve,
  ArcCurve,
  CurvePath
} from 'three'

// 1
// // 三维向量Vector3创建一组顶点坐标
// const arr = [
//   new Vector3(-50, 20, 90),
//   new Vector3(-10, 40, 40),
//   new Vector3(0, 0, 0),
//   new Vector3(60, -60, 0),
//   new Vector3(70, 0, 80)
// ]
// // 三维样条曲线
// const curve = new CatmullRomCurve3(arr);

// 2
// // 二维向量Vector2创建一组顶点坐标
// const arr = [
//   new Vector2(-100, 0),
//   new Vector2(0, 30),
//   new Vector2(100, 0),
// ];
// // 二维样条曲线
// const curve = new SplineCurve(arr);

// 3
// p1、p2、p3表示三个点坐标
// p1、p3是曲线起始点，p2是曲线的控制点
// const p1 = new Vector2(-80, 0);
// const p2 = new Vector2(20, 100);
// const p3 = new Vector2(80, 0);

// const curve = new QuadraticBezierCurve(p1, p2, p3);

// // 4
// // p1、p3轨迹线起始点坐标
// const p1 = new Vector3(-100, 0, -100);
// const p3 = new Vector3(100, 0, 100);
// // 计算p1和p3的中点坐标
// const x2 = (p1.x + p3.x)/2;
// const z2 = (p1.z + p3.z)/2;
// const h = 50;
// const p2 = new Vector3(x2, h, z2);

// const arr = [p1, p2, p3];
// // 三维样条曲线
// const curve = new CatmullRomCurve3(arr);

// // 5
// // p1、p3轨迹线起始点坐标
// const p1 = new Vector3(-100, 0, -100);
// const p3 = new Vector3(100, 0, 100);
// // 计算p1和p3的中点坐标
// const x2 = (p1.x + p3.x)/2;
// const z2 = (p1.z + p3.z)/2;
// const h = 100;
// const p2 = new Vector3(x2, h, z2);
// // 三维二次贝赛尔曲线
// const curve = new QuadraticBezierCurve3(p1, p2, p3);

// 6
const R = 80 //圆弧半径
const H = 200 //直线部分高度
// 直线1
const line1 = new LineCurve(new Vector2(R, H), new Vector2(R, 0))
// 圆弧
const arc = new ArcCurve(0, 0, R, 0, Math.PI, true)
// 直线2
const line2 = new LineCurve(new Vector2(-R, 0), new Vector2(-R, H))

// CurvePath创建一个组合曲线对象
const curve = new CurvePath()
//line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
curve.curves.push(line1, arc, line2)

//曲线上获取点
const pointsArr = curve.getPoints(100) as Vector2[]
const geometry = new BufferGeometry()
//读取坐标数据赋值给几何体顶点
geometry.setFromPoints(pointsArr)
// 线材质
const material = new LineBasicMaterial({
  color: 0x00fffff
})
// 线模型
const model = new Line(geometry, material)

// 可视化curve.getPoints从曲线上获取的点坐标
const material2 = new PointsMaterial({
  color: 0xff00ff,
  size: 10
})
//点模型对象
const points = new Points(geometry, material2)

// // 观察辅助点
// const geometry2 = new BufferGeometry();
// geometry2.setFromPoints([p1,p2,p3]);
// const material2 = new PointsMaterial({
//     color: 0xff00ff,
//     size: 10,
// });
// //点模型对象
// const points = new Points(geometry2, material2);
// // 三个点构成的线条
// const line2 = new Line(geometry2, new LineBasicMaterial());

export { model, points }
