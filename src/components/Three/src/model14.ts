import * as THREE from 'three'

const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshLambertMaterial({
    color: 0x00fff2
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 50, 0)

const mesh2 = mesh.clone()
mesh2.position.set(50, 50, 0)
mesh2.castShadow = true

const mesh3 = mesh.clone()
mesh3.position.set(0, 50, 50)
mesh3.castShadow = true

const mesh4 = mesh.clone()
mesh4.position.set(50, 50, 50)
mesh4.castShadow = true

// 设置产生投影的网格模型
mesh.castShadow = true;

const model = new THREE.Group()
model.add(mesh, mesh2, mesh3, mesh4)
export { model }