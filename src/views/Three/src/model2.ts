import { Group, SkinnedMesh, Vector3, MeshStandardMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import model from '../assets/Xbot.glb'

const mesh = new Group()

const loader = new GLTFLoader()
// ui给的模型可能会有材质共享问题,要注意
loader.load(model, (gltf) => {
  console.log('gltf :>> ', gltf.scene)
  console.log('Beta_Joints :>> ', gltf.scene.getObjectByName('Beta_Joints'))

  // 获取模型中一个对象并进行一些操作
  // const BetaJoints = gltf.scene.getObjectByName('Beta_Joints') as SkinnedMesh
  // const BetaJoints_material = BetaJoints.material as MeshStandardMaterial
  // BetaJoints_material.color.set(0xff0000)
  // gltf.scene.getObjectByName('Beta_Joints')!.visible = false

  // gltf.scene.traverse((obj: any) => {

  //   console.log('obj :>> ', obj)

  //   if (obj.isMesh) {
  //     console.log('obj.name :>> ', obj.name)
  //     const BetaJoints = gltf.scene.getObjectByName(obj.name) as SkinnedMesh
  //     const BetaJoints_material = BetaJoints.material as MeshStandardMaterial
  //     BetaJoints_material.color.set(0xff0000)
  //   }
  // })

  mesh.add(gltf.scene)
})

export { mesh }
