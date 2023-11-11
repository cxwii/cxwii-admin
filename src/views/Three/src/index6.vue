<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { camera } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { model, cubeTextureLoader } from './model14'
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)
const threeRef = ref()

// 背景环境贴图
scene.background = cubeTextureLoader

scene.add(model)

// // 聚光源
// // 0xffffff:光源颜色
// // 1.0：光照强度intensity
// const spotLight = new THREE.SpotLight(0xffffff,1.0);
// scene.add(spotLight);//光源添加到场景中
// // spotLight.intensity = 1.0;//光照强度

// // 设置聚光光源发散角度
// spotLight.angle = Math.PI / 9;//光锥角度的二分之一
// //设置光源不随距离衰减
// spotLight.decay = 0.0;
// // 设置聚光光源位置
// spotLight.position.set(100, 100, 100);
// // spotLight.target是一个模型对象Object3D，默认在坐标原点
// spotLight.target.position.set(0, 0, 0);

// // 聚光源辅助对象，可视化聚光源
// // PointLightHelper不能用于聚光源
// const spotLightHelper = new THREE.SpotLightHelper(spotLight,0xffffff)
// scene.add(spotLightHelper);

// 2
// 阴影的计算
// 先是模型本身, 光源, 承载阴影的模型(就是地板), 渲染器
// 这四个对象要开启对应的计算阴影的属性
// 然后阴影是一个正投影摄像机,所以要给它设置范围,也就是阴影会在那个范围内渲染
// 这个属性在directionalLight.shadow.camera里就可以拿到
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// 平行光设置产生阴影的光源对象,开启光源阴影的计算功能
directionalLight.castShadow = true
directionalLight.position.set(100, 100, 100)
scene.add(directionalLight)

// 模型加载的话可以这样所有Mesh都批量设置.castShadow和.receiveShadow属性
// gltf.scene.traverse(function (obj: any) {
//   if (obj.isMesh) {
//     obj.castShadow = true
//     obj.receiveShadow = true
//   }
// })

// 地板(地板要设置receiveShadow不然接收不了阴影)
// 平面几何体
const planGeometry = new THREE.PlaneGeometry(1000, 1000)
// 平面几何材质
const planMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide })
// 平面
const plan = new THREE.Mesh(planGeometry, planMaterial)
plan.position.set(0, -10, 0)
plan.rotation.x = -Math.PI / 2
scene.add(plan)
// 设置接收阴影的投影面
plan.receiveShadow = true
// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(500, 500)
// 设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true

// 模型表面产生条纹影响渲染效果，可以改变.shadowMap.type默认值优化
// 更换阴影贴图的算法
// 模型表面产生条纹影响渲染效果，可以改变.shadowMap.type默认值优化
// HREE.BasicShadowMap：性能非常好但质量很差
// THREE.PCFShadowMap：性能较差但边缘更平滑
// THREE.PCFSoftShadowMap：性能较差但边缘更柔和
// THREE.VSMShadowMap：性能较差，约束较多，可能会产生意想不到的结果
// renderer.shadowMap.type = THREE.VSMShadowMap;

// 查看平行光阴影相机属性
console.log('阴影相机属性', directionalLight.shadow.camera)
// 可视化平行光阴影对应的正投影相机对象
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(cameraHelper)

// 设置三维场景计算阴影的范围
// 超出这个范围就不会再计算阴影了,所以应该和场景相机的范围一致
directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 1000

// mapSize属性默认512x512
// 一般用于shadow.camera范围增加导致阴影出现模糊锯齿的时候就把这个值适当增大
console.log('阴影默认像素', directionalLight.shadow.mapSize)
// directionalLight.shadow.mapSize.set(128,128)
directionalLight.shadow.mapSize.set(1024 * 1, 1024 * 1)

// 模糊弱化阴影边缘(就是边缘模糊,越大越模糊)
console.log('.shadow.radius', directionalLight.shadow.radius)
directionalLight.shadow.radius = 3

const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

// 调试器
// const gui = new GUI()
// // gui.add(directionalLight.position, 'x', -200 , 200).name('x').step(1)
// gui.add(directionalLight.position, 'y', -200, 200).name('y').step(1).onChange(
//   () => {
//     cameraHelper.update();
//   }
// )
// const obj = {
//   R: 100,
//   angle: 0,
// };
// gui.add(obj, 'R', 0, 300).onChange(function (value) {
//   directionalLight.position.x = value * Math.cos(obj.angle);
//   directionalLight.position.z = value * Math.sin(obj.angle);
//   cameraHelper.update();
// });
// gui.add(obj, 'angle', 0, Math.PI * 2).onChange(function (value) {
//   directionalLight.position.x = obj.R * Math.cos(value);
//   directionalLight.position.z = obj.R * Math.sin(value);
//   cameraHelper.update();
// });
// // 阴影子菜单
// const shadowFolder = gui.addFolder('平行光阴影');
// const cam = directionalLight.shadow.camera;
// // 相机left、right等属性变化执行.updateProjectionMatrix();
// // 相机变化了，执行CameraHelper的更新方法.update();
// shadowFolder.add(cam,'left',-500,0).onChange(function(v){
//     cam.updateProjectionMatrix();//相机更新投影矩阵
//     cameraHelper.update();//相机范围变化了，相机辅助对象更新
// });
// shadowFolder.add(cam,'right',0,500).onChange(function(v){
//     cam.updateProjectionMatrix();
//     cameraHelper.update();
// });
// shadowFolder.add(cam,'top',0,500).onChange(function(v){
//     cam.updateProjectionMatrix();
//     cameraHelper.update();
// });
// shadowFolder.add(cam,'bottom',-500,0).onChange(function(v){
//     cam.updateProjectionMatrix();
//     cameraHelper.update();
// });
// shadowFolder.add(cam,'far',0,1000).onChange(function(v){
//     cam.updateProjectionMatrix();
//     cameraHelper.update();
// });

nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })

  cameraHelper.update()
})

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
