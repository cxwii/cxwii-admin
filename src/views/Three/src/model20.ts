import * as THREE from 'three'
const model = new THREE.Group()

const Bone1 = new THREE.Bone() //关节1，用来作为根关节
const Bone2 = new THREE.Bone() //关节2
const Bone3 = new THREE.Bone() //关节3
const Bone4 = new THREE.Bone() //关节4
const Bone5 = new THREE.Bone() //关节5

// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2)
Bone2.add(Bone3)
Bone3.add(Bone4)
Bone4.add(Bone5)

//根关节Bone1默认位置是(0,0,0)
// Bone2.position.y = 20; //Bone2相对父对象Bone1位置
// Bone3.position.y = 30; //Bone3相对父对象Bone2位置
//平移Bone1，Bone2、Bone3跟着平移

// 关节1作为第一个父对象不渲染,每个后续的子对象才渲染,并基于上一个对象的
// 末点上的坐标位置来设置自身的坐标并渲染
// 这就是为什么打印出来的Bone2, Bone3...这些的位置不叠加的原因
// console.log('Bone1 :>> ', Bone1.position);
// console.log('Bone2 :>> ', Bone2.position);
// console.log('Bone3 :>> ', Bone3.position);

// 骨骼关节旋转
// Bone1.rotateX(Math.PI / 6);
// Bone2.rotateX(Math.PI / 6);

model.add(Bone1)

// SkeletonHelper会可视化参数模型对象所包含的所有骨骼关节
const skeletonHelper = new THREE.SkeletonHelper(model)
model.add(skeletonHelper)
export { model, Bone1, Bone2, Bone3, Bone4, Bone5 }
