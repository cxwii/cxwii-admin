## cxwii-Admin
```
这是一款服务于前端开发者,以开箱即用,符合直觉作为主旨的集成解决方案中心。
适用于各类管理系统,找寻各类解决方案,各类插件demo,作用于项目启动框架
(兼用于实验Vxwui)
```

## 使用技术
```
🎇 采用 现代WEB 主流技术标准: HTML5 + CSS3 + ES6 + TS
🆒 使用 Vue3 主流技术栈: Vite + Vue3
🎨 二次封装 ElementPlus UI组件,优雅,易用,符合符合直觉
🖼 封装 Echarts 和 THREE 的2D和3D数据可视化库组件
💎 封装常见 前端业务库 的实例组件: xgplaye, qrcode, wangeditor等
⚙ 封装基于 原生JS 的原生组件, 采用 WebComponents 的思想
🧬 使用 CSS原子化 技术框架: TailwindCSS 轻量,便捷
🐱‍🐉 应用 微前端 技术框架: MicroApp 搭建 Vue2, React18, Angular17 开发环境,可以高效兼容开发
🌟 实验 个人UI库 VxwUI, 感兴趣可以移步个人主页查看

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