import * as THREE from 'three'

// 可以直接用点来旋转绘制,也可以用线提取点来绘制
// Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
// const pointsArr = [
//   new THREE.Vector2(50, 60),
//   new THREE.Vector2(25, 0),
//   new THREE.Vector2(50, -60)
// ];



// 通过三个点定义一个二维样条曲线
const curve = new THREE.SplineCurve([
  new THREE.Vector2(50, 60),
  new THREE.Vector2(25, 0),
  new THREE.Vector2(50, -60)
]);
//曲线上获取点,作为旋转几何体的旋转轮廓
const pointsArr = curve.getPoints(50); 
console.log('旋转轮廓数据',pointsArr);



// LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
// pointsArr：旋转几何体的旋转轮廓形状
const geometry = new THREE.LatheGeometry(pointsArr);



const material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,//双面显示看到管道内壁
});

const model = new THREE.Mesh( geometry, material );

export { model }