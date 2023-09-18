<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PointLight,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  PointLightHelper,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  Clock
} from 'three'
// 轨道控制器,不用装OrbitControls包也行,按这个路径就能找到了(大多数three扩展插件也如此)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// threeRef
const threeRef = ref<ElRef>()

// three的变量不能使用响应式,否则会出现问题
// 三维场景
let scene: Nullable<Scene> = null
// 物体
let geometry: Nullable<BoxGeometry> = null
// 材质
let material: Nullable<MeshBasicMaterial> = null
// 光源
let pointLight: Nullable<PointLight> = null
// 网格模式
let mesh: Nullable<Mesh> = null
// 相机(透视相机)
let camera: Nullable<PerspectiveCamera> = null
// PerspectiveCamera的参数,均取默认值,组成视锥体(视角范围)
let width: number = 500
let height: number = 500
// webGL渲染器
let renderer: Nullable<WebGLRenderer> = null
// axesHelper
let axesHelper: Nullable<AxesHelper> = null
// 轨道控制器
let controls: Nullable<OrbitControls> = null
// 辅助光源位置观察
let pointLightHelper: Nullable<PointLightHelper> = null
// 环境光
let light: Nullable<AmbientLight> = null
// 平行光
let directionalLight: Nullable<DirectionalLight> = null
// 平行光的辅助光源位置观察
let directionalLightHelper: Nullable<DirectionalLightHelper> = null
// three提供的时间对象
let clock: Nullable<Clock> = new Clock()

// 场景
const sceneInit = () => {
  // 创建三维场景
  scene = new Scene()

  // 创建物体(这里为几何长方体)
  geometry = new BoxGeometry(100, 100, 100)

  // 创建材质(这里是基础材质,不同材质对光源的效果也不同,这个是不受光照影响的)
  // material = new MeshBasicMaterial({
  //   // 设置颜色
  //   color: 0x3393f3,
  //   // 开启材质透明
  //   transparent: true,
  //   // 设置透明度
  //   opacity: 0.5
  // })

  // 漫反射材质,受光照影响(不设置光源的话就看不到物体)
  material = new MeshLambertMaterial({
    // 设置颜色
    color: 0x3393f3
  })

  // 创建光源
  pointLight = new PointLight(0xffffff, 5, 0, 0)
  // 设置光源位置
  pointLight.position.set(150, 110, 80)
  scene.add(pointLight)

  // 可视化光源
  pointLightHelper = new PointLightHelper(pointLight, 5, 0x67c23a)
  scene.add(pointLightHelper)


  // 环境光(均匀无方向散布于房间中的光)
  light = new AmbientLight( 0x404040 )
  scene.add(light)

  // 创建网格模式,也就是立体空间
  // 将geometry物体形状和material物体的材质作为参数导入
  mesh = new Mesh(geometry, material)
  // 设置物体位置x,y,z的直角坐标系(即物体中心在坐标系中的位置)
  mesh.position.set(0, 0, 0)
  // 将这个网格模型添加进三维场景
  scene.add(mesh)


  // 平行光(不存在光源点,沿设置的方向发射)
  directionalLight = new DirectionalLight( 0xffffff, 5)
  directionalLight.position.set(60, 60, 120)
  // 与上面设置的位置两点组成一条直线,从上面的位置射向下面的位置
  // 可以将目标设置为场景中的其他对象（任意拥有 position 属性的对象）
  directionalLight.target = mesh
  scene.add(directionalLight)
  // 平行光的辅助光源位置观察
  directionalLightHelper = new DirectionalLightHelper(directionalLight, 5, 0xff0000)
  scene.add(directionalLightHelper)

  // 创建三维场景观察用的辅助坐标线
  axesHelper = new AxesHelper(150)
  scene.add(axesHelper)
}

// 相机
const cameraInit = () => {
  // 创建相机
  camera = new PerspectiveCamera(50, width / height, 0.1, 2000)

  // 设置相机位置
  camera.position.set(200, 200, 200)

  // 相机观看的位置(即从相机位置看到这个位置,组成一个视角方向,上面那个点的位置到这个点的位置,两点一线)
  camera.lookAt(mesh!.position)
}

// webGL渲染器
const rendererInit = () => {
  // 创建webGL渲染器
  renderer = new WebGLRenderer()

  // 设置canvas画布大小
  renderer.setSize(width, height)

  // 执行渲染
  renderer.render(scene!, camera!)

  // 放到页面容器上
  threeRef.value?.appendChild(renderer!.domElement)
}

// 引入控制器
const orbitControlsInit = () => {
  controls = new OrbitControls(camera!, threeRef.value!)
  // 如果使用了动画就没必要绑定事件了,因为动画就给你渲染了,这样可以节省性能
  controls.addEventListener('change', () => {
    renderer?.render(scene!, camera!)
  })
}

// 执行动画
const render = () => {
  const time = clock!.getDelta()*1000
  // 渲染的时间
  console.log('spt :>> ', time)
  // 帧率
  console.log('fps :>> ', 1000 / time)
  mesh?.rotateY(0.003)
  renderer?.render(scene!, camera!)
  requestAnimationFrame(render)
}

onMounted(async () => {
  // 前三步是所有three的基础
  await sceneInit()
  await cameraInit()
  await rendererInit()
  // 引入的three扩展(轨道控制器)
  await orbitControlsInit()
  // 平时就别打开动画了
  // await render()
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>