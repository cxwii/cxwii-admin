import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three'

const boxGeometry = new BoxGeometry(3, 3, 3)
const material = new MeshLambertMaterial({})
const mesh = new Mesh(boxGeometry, material)

export { mesh }
