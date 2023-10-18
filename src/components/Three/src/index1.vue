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
  Clock,
  SphereGeometry,
  MeshPhongMaterial,
  Vector3,
  Material,
  MeshStandardMaterial
} from 'three'
// 轨道控制器,不用装OrbitControls包也行,按这个路径就能找到了(大多数three扩展插件也如此)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 帧率控件
import Stats from 'three/examples/jsm/libs/stats.module.js'
// 参数控件
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { nullable } from 'vue-types'

const rotateData1 = new Vector3(1,1,1)
const rotateData2 = new Vector3(-1,1,1)

// threeRef
const threeRef = ref<ElRef>()

// three的变量不能使用响应式,否则会出现问题
// 三维场景
let scene: Nullable<Scene> = null
// 物体
let geometry: Nullable<BoxGeometry> = null
// 材质
let material: Nullable<MeshStandardMaterial> = null
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
// 帧率
let stats: Nullable<Stats> = new Stats()
let statsRef = ref<ElRef>()
// 球体(还有好多种就不全写了)
let sphereGeometry: Nullable<SphereGeometry> = new SphereGeometry( 15, 32, 16 )
// 高光材质
let meshPhongMaterial: Nullable<MeshPhongMaterial> = new MeshPhongMaterial({
  color: 0x3393f3,
  shininess: 100,
  specular: 0x444444
})
// 参数控件
let gui: Nullable<GUI> = null
let guiRef = ref<ElRef>()

let obj = {
  rotateY: false
}

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
  // material = new MeshLambertMaterial({
  //   // 设置颜色
  //   color: 0x3393f3,
  //   // wireframe: true
  // })

  //pbr(模拟物理效果材质)
  material = new MeshStandardMaterial({
    color: 0x3393f3,
    // 粗糙度
    roughness: 0.5,
    // 类金属度
    metalness: 1
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
  light = new AmbientLight(0x404040)
  scene.add(light)

  // 创建网格模式,也就是立体空间
  // 将geometry物体形状和material物体的材质作为参数导入
  mesh = new Mesh(geometry, material)
  // 设置物体位置x,y,z的直角坐标系(即物体中心在坐标系中的位置)
  mesh.position.set(0, 0, 0)
  // 将这个网格模型添加进三维场景
  scene.add(mesh)

  // // 球体(meshPhongMaterial高光的材质)
  // mesh = new Mesh(sphereGeometry!, meshPhongMaterial!)
  // mesh.position.set(110, 0, 0)
  // scene.add(mesh)

  // 阵列
  // for (let index = 0; index < 10; index++) {
  //   mesh = new Mesh(geometry, material)
  //   mesh.position.set(index * 200, 0, 0)
  //   scene.add(mesh)
  // }

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

  // #region
  // 开启动画就明白了
  // 对象的独自平移所以中心不移动
  // geometry.translate(50, 50, 50)
  
  // 作为组对象的整体移动,所以中心一起移动
  // mesh.position.x = 50
  // mesh.position.y = 50
  // mesh.position.z = 50
  // #endregion

  // visible属性隐藏一个对象(添加进场景前隐藏,否则就无效了)
  // material材质也有这个属性
  // mesh.visible = false
  // let aaaa = mesh.material as Material
  // aaaa.visible = false
  // // ;是这样用的,用于断言一个类型,用于语法识别不会报错
  // ;(mesh.material as Material).visible = false
}

// 相机
const cameraInit = () => {
  // 创建相机
  camera = new PerspectiveCamera(50, width / height, 0.1, 2000)
  // 相机的一些属性发生变化的时候需要调用updateProjectionMatrix去更新内容
  // (如宽高比发生变化,这里就不需要了写一下而已)
  // (不然会出现物体变形问题,视锥体不同步变换发生变形导致的)
  // camera.updateProjectionMatrix()

  // 设置相机位置
  camera.position.set(200, 200, 200)

  // 相机观看的位置(即从相机位置看到这个位置,组成一个视角方向,上面那个点的位置到这个点的位置,两点一线)
  camera.lookAt(mesh!.position)
}

// webGL渲染器
const rendererInit = () => {
  // 创建webGL渲染器
  renderer = new WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  // 给three屏幕宽高比,避免设置抗锯齿后的物体模糊
  // 这个基本属于必写的
  renderer.setPixelRatio(window.devicePixelRatio)

  // 设置画布背景颜色
  renderer.setClearColor(0x444444)

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
  // 相机控件会直接改变相机位置为默认的0,0,0,所以要在相机控件这里设置多一次位置
  // controls.target.set()
  // 如果使用了动画就没必要绑定事件了,因为动画就给你渲染了,这样可以节省性能
  controls.addEventListener('change', () => {
    renderer?.render(scene!, camera!)
  })
}

// 执行动画
const render = () => {
  // 通过clock来计算,不过一般都是用下面那个stats
  // const time = clock!.getDelta()*1000
  // // 渲染的时间
  // console.log('spt :>> ', time)
  // // 帧率
  // console.log('fps :>> ', 1000 / time)

  stats!.dom.style.position = 'inherit'
  statsRef.value?.appendChild(stats!.dom)
  stats!.update()

  // if (obj.rotateY) mesh?.rotateY(0.005)
  // if (obj.rotateY) {
  //   // 这个vector3并非实际单位,要用normalize转换,不然就会变形了
  //   mesh?.rotateOnWorldAxis(rotateData1.normalize(), 0.006)
  // }

  if (obj.rotateY) {
    mesh!.rotation.x += 0.005;
	  mesh!.rotation.y += 0.005;
  }

  renderer?.render(scene!, camera!)
  requestAnimationFrame(render)
}

// 参数控制台
const guiRender = () => {
  gui = new GUI()
  // addFolder创建子菜单,可以套娃
  const xyz = gui.addFolder('材质')
  guiRef.value?.appendChild(gui!.domElement)
  gui!.domElement.style.position = 'inherit'
  // step拖动的步长
  gui!.add(light!, 'intensity', 0 , 10).name('环境光强度').step(0.1)
  xyz.add(mesh!.position, 'x', -100, 100).onChange((value) => {
    mesh!.position.z = value
  })
  xyz.add(mesh!.position!, 'y', [-100, -50, 0, 50, 10])
  xyz.add(mesh!.position!, 'z', {
    left: -100,
    centre: 0,
    right: 100
  })
  gui!.addColor({color:0x00ffff}, 'color').onChange((value) => {
    material!.color.set(value)
  })
  gui!.add(obj, 'rotateY').name('旋转')
  xyz.close()
}

onMounted(async () => {
  // 前三步是所有three的基础
  await sceneInit()
  await cameraInit()
  await rendererInit()
  // 引入的three扩展(轨道控制器)
  await orbitControlsInit()
  // 平时就别打开动画了
  await render()
  await guiRender()
})
</script>

<template>
  <div>
    <div ref="statsRef"></div>
    <div ref="guiRef"></div>
    <div ref="threeRef" class="h-full w-full"></div>
  </div>
</template>

<style scoped lang="scss"></style>