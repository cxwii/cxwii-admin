import {
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  MeshLambertMaterial,
  DoubleSide,
  Mesh
} from 'three'

// 三维样条曲线
const path = new CatmullRomCurve3([
  new Vector3(-50, 20, 90),
  new Vector3(-10, 40, 40),
  new Vector3(0, 0, 0),
  new Vector3(60, -60, 0),
  new Vector3(70, 0, 80)
])

// path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数

// 其实就是用这个path这条曲线来生成,可以用model6里面任意一条曲线来生成
const geometry = new TubeGeometry(path, 40, 2, 25)

const material = new MeshLambertMaterial({
  side: DoubleSide //双面显示看到管道内壁
})

const model = new Mesh(geometry, material)

export { model }
