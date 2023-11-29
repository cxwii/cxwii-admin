import type { RouteRecordRaw } from 'vue-router'

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }

  declare interface AppRouteTreeNode {
    code: string
    children?: TreeNode[]
  }

// Record现在生成一个属性为 string | number | symbol，类型为unknown的类型集合
// 免得用户书写一些非RouteMeta的类型
interface RouteMeta extends Record<string | number | symbol, unknown> {
  //title: 使用什么标题
  title?: string
  // icon: 使用什么icon
  icon?: string
  // noCache: 不需要缓存
  noCache?: boolean
  // affix:初始化的时候就渲染标签
  affix?: boolean
  // noTagsView: 是否需要标签页
  noTagsView?: boolean
  // code是另一种路由方式时需要的数据
  code?: string
}
}