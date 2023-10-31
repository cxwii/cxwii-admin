import * as THREE from 'three'
const model = new THREE.Group()

const Bone1 = new THREE.Bone(); //关节1，用来作为根关节
const Bone2 = new THREE.Bone(); //关节2
const Bone3 = new THREE.Bone(); //关节3

// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2);
Bone2.add(Bone3);

//根关节Bone1默认位置是(0,0,0)
Bone2.position.y = 60; //Bone2相对父对象Bone1位置
Bone3.position.y = 30; //Bone3相对父对象Bone2位置
//平移Bone1，Bone2、Bone3跟着平移
Bone1.position.set(50,0,50);

// 骨骼关节旋转
Bone1.rotateX(Math.PI / 6);
Bone2.rotateX(Math.PI / 6);

model.add(Bone1)

// SkeletonHelper会可视化参数模型对象所包含的所有骨骼关节
const skeletonHelper = new THREE.SkeletonHelper(model);
model.add(skeletonHelper);
export { model, Bone1, Bone2 }