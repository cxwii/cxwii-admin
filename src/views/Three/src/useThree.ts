import { Scene, AmbientLight, AxesHelper, PerspectiveCamera, WebGLRenderer } from 'three'

// 场景
const scene = new Scene()
// 环境光
const ambientLight = new AmbientLight()
scene.add(ambientLight)
// 辅助线
const axesHelper = new AxesHelper(100)
scene.add(axesHelper)
// 相机
const camera = new PerspectiveCamera()
camera.position.set(150, 200, 200)
camera.lookAt(0, 0, 0)
// 渲染器
const renderer = new WebGLRenderer({
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(500, 500)

export { scene, camera, renderer }
