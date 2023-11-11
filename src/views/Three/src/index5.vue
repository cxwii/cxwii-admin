<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, renderer } from './useThree'
// import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MapControls } from 'three/examples/jsm/controls/MapControls'
import { model, path } from './model13'
const threeRef = ref()

// import { model } from './model12'
scene.add(model)

// 1
// 正投影相机
// 和透视投影相机的区别就在于它不会透视,怎么拉大都是实体不能透过
// left和bottom要负数
// 修改相机参数需要使用updateProjectionMatrix来生效(比如自适应的时候)
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 2000)
camera.position.set(10, 10, 10)
camera.lookAt(0, 0, 0)

// 默认拍照的反向，应该在lookat之前设置
// camera.up.set(1, 0, 0);
// console.log('.up默认值',camera.up);

// 相机动画
let angle = 0 //用于圆周运动计算的角度值
const R = 15 //相机圆周运动的半径
const render = () => {
  angle += 0.005
  // 相机y坐标不变，在XOZ平面上做圆周运动
  camera.position.x = R * Math.cos(angle)
  camera.position.z = R * Math.sin(angle)
  camera.lookAt(0, 0, 0)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
// render();

// // 2
// // 轨道动画

// // 这里要用透视投影不然就看不到了
// const camera = new THREE.PerspectiveCamera()

// // 从曲线上等间距获取一定数量点坐标
// const pointsArr = path.getSpacedPoints(500);
// // 渲染循环
// let i = 0; //在渲染循环中累加变化
// const render = () => {
//     if (i < pointsArr.length - 1) {
//         // 相机位置设置在当前点位置
//         camera.position.copy(pointsArr[i]);
//         // 曲线上当前点pointsArr[i]和下一个点pointsArr[i+1]近似模拟当前点曲线切线
//         // 设置相机观察点为当前点的下一个点，相机视线和当前点曲线切线重合
//         camera.lookAt(pointsArr[i + 1]);
//         i += 1; //调节速度
//     } else {
//         i = 0
//     }
//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
// }
// // render();

nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  // // 轨道控件
  // const controls = new OrbitControls(camera, threeRef.value)
  // controls.addEventListener('change', () => {
  //   renderer.render(scene, camera)
  //   // 相机位置与目标观察点距离
  //   // 正投影相机没有这个
  //   // const dis = controls.getDistance();
  //   // console.log('dis',dis);
  // })
  // controls.enablePan = false; //禁止右键拖拽
  // controls.enableZoom = false;//禁止缩放
  // controls.enableRotate = false; //禁止旋转

  // // controls.target默认值是坐标原点
  // controls.target.set(10, 0, 0);
  // //update()函数内会执行camera.lookAt(x, y, z)
  // // 设置了target后要使用update执行生效
  // controls.update();

  // .minDistance表示相机位置.position和相机目标观察点controls.target的最小距离。
  //相机位置与观察目标点最小值
  // maxDistance也是一样
  // controls.minDistance = 200;

  // 上下旋转范围
  // controls.minPolarAngle = 0;//默认值0
  // controls.maxPolarAngle = Math.PI/2;//默认值Math.PI
  // // 左右旋转范围
  // controls.minAzimuthAngle = -Math.PI/2;
  // controls.maxAzimuthAngle = Math.PI/2;

  // 相机控件
  // 与OrbitControls非常相似
  // 但它完全是通过相机移动来实现，所以像正投影相机的位置也能获取
  const mapControls = new MapControls(camera, threeRef.value)
  mapControls.addEventListener('change', () => {
    renderer.render(scene, camera)
    // 鼠标右键旋转时候，查看.position变化
    // 鼠标左键拖动的时候，查看.position、.target的位置会变化
    console.log('camera.position', camera.position)
    console.log('controls.target', mapControls.target)
  })
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
