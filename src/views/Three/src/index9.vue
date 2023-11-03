<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { mesh, meshs } from './model17'
// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

// CSS3渲染器CSS3DRenderer和CSS2渲染器CSS2DRenderer整体使用流程基本相同
// 只是在HTML标签渲染效果方面不同，比如CSS3渲染的标签会跟着场景相机同步缩放
// 而CSS2渲染的标签默认保持自身像素值。
// 全局把CSS2DRenderer, CSS2DObject替换一下就能看到不同了

// CSS3对象模型CSS3DObject渲染效果类似矩形平面网格模型Mesh。
// CSS3精灵模型CSS3DSprite渲染效果类似以前学习的精灵模型对象Sprite。
// 同样全局替换就可以看到了

// scene.add(model)

const threeRef = ref()
const tagRef = ref()
nextTick(() => {
  // HTML元素转化为threejs的CSS2模型对象

  // 创建一个div(也可以直接在html中创建)
  // const tagDiv = document.createElement('div')
  // const tagDivContent = document.createTextNode("mesh1")
  // tagDiv.appendChild(tagDivContent)
  // tagDiv.style.color = '#ffffff'
  // tagDiv.style.width = '100px'
  // tagDiv.style.height = '100px'
  // tagDiv.style.backgroundColor = 'pink'

  // 把这个div变成一个three对象
  const tag = new CSS3DSprite(tagRef.value)

  tag.position.set(0, 50, 0)

  // 创建一个CSS2渲染器CSS2DRenderer
  const css2Renderer = new CSS3DRenderer()
  // width, height：canvas画布宽高度
  css2Renderer.setSize(500, 500)
  // css2Renderer.domElement会生成一个div包裹在外面,然后基本都是使用这个div来操控
  threeRef.value.appendChild(css2Renderer.domElement)
  // 元素出现遮挡可以css2Renderer.domElement.style.pointerEvents = 'none'
  css2Renderer.domElement.style.pointerEvents = 'none'
  css2Renderer.domElement.style.position = 'absolute'
  css2Renderer.domElement.style.top = '0px'

  // 强制修改他们的层级
  // renderer.domElement.style.zIndex = '1'
  // css2Renderer.domElement.style.zIndex = '-1'

  // 可以给他们都丢到一个组里
  // const model = new THREE.Group()
  // model.add(meshs)
  // model.add(tag)

  // scene.add(model)
  // model.position.x = 50;

  // 也可以直接作为一个单独模型的子对象
  mesh.add(tag)
  scene.add(meshs)

  // 射线拾取
  threeRef.value.addEventListener('click', (event: any) => {
    const px = event.offsetX
    const py = event.offsetY
    const x = (px / 500) * 2 - 1
    const y = -(py / 500) * 2 + 1
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
    const intersects = raycaster.intersectObjects(meshs.children)
    if (intersects.length > 0) {
      ;(intersects[0].object as any).material.color.set(0xbf2626)
    }
    css2Renderer.render(scene, camera)
    renderer.render(scene, camera)
  })

  // 缩放标签
  tag.scale.set(0.5, 0.5, 1)

  // css2Renderer的渲染
  css2Renderer.render(scene, camera)

  // 原渲染
  threeRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)

  // css2Renderer中使用控制器会导致点击事件失效
  // 解决办法
  // 把参数container(three容器)改为renderer.domElement
  // 这样控制器的监听事件只作用于randerer生成的cavans，不会对外部产生影响
  // 然后还需要给 CSS3DRenderer 添加事件none，否则control就不能触发了
  // 以及给绑定点击事件的el元素增加pointer-events: auto
  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
    css2Renderer.render(scene, camera)
  })
})

const test = () => {
  console.log('点击 :>> ')
}
</script>

<template>
  <div ref="threeRef" class="h-full w-full relative"></div>
  <!-- backface-visibility背景不可见 -->
  <div
    ref="tagRef"
    style="
      color: aliceblue;
      cursor: pointer;
      pointer-events: auto;
      backface-visibility: hidden;
      pointer-events: auto;
    "
    @click="test"
  >
    标签
  </div>
</template>

<style scoped lang="scss"></style>
