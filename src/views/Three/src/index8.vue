<script lang="ts" setup>
import * as THREE from 'three'
import { ref, nextTick } from 'vue'
import { scene, camera, renderer } from './useThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { model } from './model16'
scene.add(model)

// 可视化射线
// scene.add(new THREE.ArrowHelper(
//   raycaster.ray.direction,
//   raycaster.ray.origin,
//   300,
//   0xff0000
// ))

for (let index = 0; index < model.children.length; index++) {
  const element: any = model.children[index]
  element.mySelected = false
  element.traverse((obj: any) => {
    if (obj.isMesh) {
      obj.myAncestors = element
    }
  })
}

// sprite精灵模型也能拾取,但这里sprite没有traverse所以不能这样改变颜色
console.log('model :>> ', model)

const threeRef = ref()
nextTick(() => {
  threeRef.value.appendChild(renderer.domElement)

  // 射线拾取
  threeRef.value.addEventListener('click', (event: any) => {
    const px = event.offsetX
    const py = event.offsetY
    //屏幕坐标px、py转标准设备坐标x、y
    //width、height表示canvas画布宽高度
    const x = (px / 500) * 2 - 1
    const y = -(py / 500) * 2 + 1
    console.log('标准坐标 :>> ', x, y)

    // 射线投射器Raycaster
    const raycaster = new THREE.Raycaster()

    //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
    // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)

    const intersects = raycaster.intersectObjects(model.children)
    console.log('射线器返回的对象', intersects)

    // intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
      const el: any = intersects[0]
      if (el.object.mySelected) {
        // el.object.material.color.set(0x00fff2)
        // el.object.mySelected = false

        el.object.myAncestors.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.material.color.set(0x00fff2)
            obj.mySelected = false
          }
        })
      } else {
        // 选中模型的第一个模型，设置为红色
        // el.object.material.color.set(0xff0000)
        // el.object.mySelected = true

        // 这样子就可以在选中子模型时,对应的父模型也被选中
        el.object.myAncestors.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.material.color.set(0xff0000)
            obj.mySelected = true
          }
        })
      }
    }

    renderer.render(scene, camera)
  })

  renderer.render(scene, camera)
  const controls = new OrbitControls(camera, threeRef.value)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
})
</script>

<template>
  <div ref="threeRef" class="h-full w-full"></div>
</template>

<style scoped lang="scss"></style>
