## cxwii-Admin
```
一款开箱即用,符合直觉的cms解决方案,却不限于cms的一款集成解决方案
适用于各类管理系统,找寻各类解决方案,各类插件demo,作用于项目启动框架
(兼用于实验Vxwui)
```

## 使用技术
```
vue3,vite4,TypeScript,ES6,echarts5,
ElementPlus,VxwUI,Tailwind,vue18n,VueRouter4,
pinia,axios,eslint,sass,three,MicroApp......
等等一系列的内容,详细请于package中查看
```

## 使用教程
```
请先移步https://github.com/cxwii/cxwii-admin-api下载后端api并部署好后台后,运行dev环境即可使用,如有问题欢迎邮箱联系1471749154@qq.com
```

## 安装依赖
```
pnpm i
```

## eslint和prettier的自动修复
```
pnpm run lint
```

## 运行dev环境
```
pnpm run dev
```

## 打包
```
pnpm run build
```

## 微前端
```
children_apps目录下的子应用每个都要单独install并运行才能在主应用这里访问
package.json下有封装好的命令,请尽量使用这些命令来安装
PS:
1 如若封装好的命令出现问题请尝试到单个文件夹内进行依赖安装和运行

2 发现当children_apps和主应用处于同一个文件下时
  就像现在这个目录结构多个的node_modules会导致npm查找依赖有问题,让vscode提示非常卡顿
  目前解办法是把子应用和主应用放不同文件夹内或者子应用不开发时就打包使用或者不要node_modules文件
```

## ＿|￣|● 感谢每一位Starred的朋友们