import * as THREE from 'three'
const model = new THREE.Group()
const geometry = new THREE.BoxGeometry(20, 20, 20)
const material = new THREE.MeshLambertMaterial({
  color: 0x00fff2,
  transparent: true,
  opacity: 0
})
const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'mesh'

model.add(mesh)
export { model, mesh }
