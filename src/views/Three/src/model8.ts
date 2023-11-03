import * as THREE from 'three'

// 1
// 可以直接用点来旋转绘制,也可以用线提取点来绘制
// Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
// const pointsArr = [
//   new THREE.Vector2(50, 60),
//   new THREE.Vector2(25, 0),
//   new THREE.Vector2(50, -60)
// ];

// // 通过三个点定义一个二维样条曲线
// const curve = new THREE.SplineCurve([
//   new THREE.Vector2(50, 60),
//   new THREE.Vector2(25, 0),
//   new THREE.Vector2(50, -60)
// ]);
// //曲线上获取点,作为旋转几何体的旋转轮廓
// const pointsArr = curve.getPoints(50);
// console.log('旋转轮廓数据',pointsArr);

// // LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
// // pointsArr：旋转几何体的旋转轮廓形状
// const geometry = new THREE.LatheGeometry(pointsArr);

// 2
// 一组二维向量表示一个多边形轮廓坐标
// const pointsArr = [
//   new THREE.Vector2(-50, -50),
//   new THREE.Vector2(-60, 0),
//   new THREE.Vector2(0, 50),
//   new THREE.Vector2(60, 0),
//   new THREE.Vector2(50, -50),
// ]
// // Shape几何轮廓
// const shape = new THREE.Shape(pointsArr);
// const geometry = new THREE.ShapeGeometry(shape);

// 3
// // Shape表示一个平面多边形轮廓
// const shape = new THREE.Shape([
//   // 按照特定顺序，依次书写多边形顶点坐标
//   new THREE.Vector2(-50, -50), //多边形起点
//   new THREE.Vector2(-50, 50),
//   new THREE.Vector2(50, 50),
//   new THREE.Vector2(50, -50),
// ]);

// //拉伸造型(将shape平移拉伸成为3d几何)
// // const geometry = new THREE.ExtrudeGeometry(
// //   shape, //二维轮廓
// //   {
// //       depth: 20, //拉伸长度
// //   }
// // );

// const geometry = new THREE.ExtrudeGeometry(
//   shape,{
//       depth: 20,
//       bevelThickness: 5, //倒角尺寸:拉伸方向
//       bevelSize: 5, //倒角尺寸:垂直拉伸方向
//       bevelSegments: 20, //倒圆角：倒角细分精度，默认3
//       bevelEnabled: false, //禁止倒角,默认true
//   }
// );

// // 4(将轮廓通过一条轨迹来形成3d几何)
// // 扫描轮廓：Shape表示一个平面多边形轮廓
// const shape = new THREE.Shape([
//   // 按照特定顺序，依次书写多边形顶点坐标
//   new THREE.Vector2(0,0), //多边形起点
//   new THREE.Vector2(0,10),
//   new THREE.Vector2(10,10),
//   new THREE.Vector2(10,0),
// ]);

// // 扫描轨迹：创建轮廓的扫描轨迹(3D样条曲线)
// const curve = new THREE.CatmullRomCurve3([
//   new THREE.Vector3( -10, -50, -50 ),
//   new THREE.Vector3( 10, 0, 0 ),
//   new THREE.Vector3( 8, 50, 50 ),
//   new THREE.Vector3( -5, 0, 100)
// ]);

// //扫描造型：扫描默认没有倒角
// const geometry = new THREE.ExtrudeGeometry(
//   shape, //扫描轮廓
//   {
//       extrudePath:curve,//扫描轨迹
//       steps:100//沿着路径细分精度，越大越光滑
//   }
// );

// // 5
// // 绘制一个矩形
// // moveTo移动点,lineTo也是移动点但这个指定是拉一条直线移动
// // const shape = new THREE.Shape();
// // shape.moveTo(10, 0); //.currentPoint变为(10,0)
// // // 绘制直线线段，起点(10,0)，结束点(100,0)
// // shape.lineTo(100, 0);//.currentPoint变为(100, 0)
// // shape.lineTo(100, 100);//.currentPoint变为(100, 100)
// // shape.lineTo(10, 100);//.currentPoint变为(10, 100)

// // // 下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0),半径50。
// // const shape = new THREE.Shape();
// // shape.lineTo(100+50, 0); //.currentPoint变为(100+50,0)
// // // 圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言，而不是坐标原点
// // shape.arc(-50,0,50,0,Math.PI/2, false); //.currentPoint变为圆弧线结束点坐标
// // console.log('currentPoint',shape.currentPoint);
// // // 绘制直线，直线起点：圆弧绘制结束的点  直线结束点：(0, 0)
// // shape.lineTo(0, 50);

// // .absarc()圆心坐标不受到.currentPoint影响
// // 以坐标原点作为参考，这一点和圆弧方法.arc()不同。
// // 对比上面去掉shape.lineTo设置的初始点就可是看出来了
// const shape = new THREE.Shape();
// shape.lineTo(100, 0); //.currentPoint变为(100,0)
// // absarc圆心坐标不受到.currentPoint影响，以坐标原点作为参考
// shape.absarc(100,0,50,0,Math.PI/2, false); //.currentPoint变为圆弧线结束点坐标
// console.log('currentPoint',shape.currentPoint);
// shape.lineTo(0, 50);

// // 2d几何
// // 第二个参数是细分数,可以渲染的更圆滑
// const geometry = new THREE.ShapeGeometry(shape, 20);

// // 3d几何
// // const geometry = new THREE.ExtrudeGeometry(shape, {
// //   depth:20,//拉伸长度
// //   bevelEnabled:false,//禁止倒角
// //   curveSegments:20,//shape曲线对应曲线细分数
// // });

// 6
const shape = new THREE.Shape()
// .lineTo(100, 0)绘制直线线段，线段起点：.currentPoint，线段结束点：(100,0)
shape.lineTo(100, 0)
shape.lineTo(100, 100)
shape.lineTo(0, 100)

// Shape内孔轮廓
const path1 = new THREE.Path() // 圆孔1
path1.absarc(20, 20, 10, 0, 2 * Math.PI, false)
const path2 = new THREE.Path() // 圆孔2
path2.absarc(80, 20, 20, 0, 2 * Math.PI, false)
const path3 = new THREE.Path() // 方形孔
path3.moveTo(50, 50)
path3.lineTo(80, 50)
path3.lineTo(80, 80)
path3.lineTo(50, 80)

shape.holes.push(path1, path2, path3)

const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 20, //拉伸长度
  bevelEnabled: false, //禁止倒角
  curveSegments: 50
})

const material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide //双面显示看到管道内壁
  // wireframe:true// 渲染成线框
})

const model = new THREE.Mesh(geometry, material)

export { model }
