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
  AxesHelper
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
let pointLightBack: Nullable<PointLight> = null
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
  pointLight.position.set(250, 120, 180)
  scene.add(pointLight)

  // 第二个光源的设置(以可以看到后背)
  pointLightBack = new PointLight(0xffffff, 3, 0, 0)
  pointLightBack.position.set(-250, -120, -180)
  scene.add(pointLightBack)

  // 创建网格模式,也就是立体空间
  // 将geometry物体形状和material物体的材质作为参数导入
  mesh = new Mesh(geometry, material)
  // 设置物体位置x,y,z的直角坐标系(即物体中心在坐标系中的位置)
  mesh.position.set(0, 0, 0)
  // 将这个网格模型添加进三维场景
  scene.add(mesh)

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
  controls.addEventListener('change', () => {
    renderer?.render(scene!, camera!)
  })
}

onMounted(async () => {
  // 前三步是所有three的基础
  await sceneInit()
  await cameraInit()
  await rendererInit()
  // 引入的three扩展(轨道控制器)
  await orbitControlsInit()
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>