import { isUrl } from '@/utils/is'
import { omit, cloneDeep, map } from 'lodash-es'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

/* index默认的根路径 */
export const index = () => import('@/views/Index/index.vue')

// 导入views页面下的所有.vue文件
const modules = import.meta.glob('../views/**/*.vue')

// 为路径加入/开头
export const addSlashToStart = (path: string): string => {
  return path.startsWith('/') || path == '' ? path : `/${path}`
}

// 正则修改解析路径
export const pathResolve = (parentPath: string, path: string) => {
  if (isUrl(path)) return path
  const childPath = path.startsWith('/') || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/')
}

// 筛选用于缓存组件的数据
export const getRawRoute = (route: RouteLocationNormalized): RouteLocationNormalized => {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}

// rdRouter的渲染方式
export const generateRoutesFn1 = (routes: AppCustomRouteRecordRaw[]): AppRouteRecordRaw[] => {
  const res: AppRouteRecordRaw[] = []
  for (const route of routes) {
    const data: AppRouteRecordRaw = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta
    }

    // 处理component
    if (route.component) {
      const component = route.component as string
      const comModule = modules[`../${route.component}.vue`]
      data.component = component === '#' ? index : comModule
    }

    // 有嵌套就再次递归
    if (route.children) {
      data.children = generateRoutesFn1(route.children)
    }

    res.push(data as AppRouteRecordRaw)
  }
  return res
}

// codeRouter渲染方式
export const generateRoutesFn2 = (
  routes: AppRouteRecordRaw[],
  codes: AppRouteTreeNode[]
): AppRouteRecordRaw[] => {
  const resultCodes: string[] = flattenTreeRoutes(codes)
  const resultRoutes: AppRouteRecordRaw[] = filtereCodeRouter(routes, resultCodes)
  return resultRoutes
}

// codeRouter渲染方式里用的将路由表根据code过滤的方法
const filtereCodeRouter = (
  routes: AppRouteRecordRaw[],
  codes: string[] = [],
  result: AppRouteRecordRaw[] = []
) => {
  result = routes
  for (let index = 0; index < result.length; index++) {
    if (!codes.includes(result[index].meta.code)) {
      result.splice(index, 1)
    } else if (routes[index].children) {
      routes[index].children = filtereCodeRouter(
        routes[index].children as AppRouteRecordRaw[],
        codes
      )
    }
  }
  return result
}

// codeRouter渲染方式里用的将树状数据展平一维数组的方法
export const flattenTreeRoutes = (tree: AppRouteTreeNode[], result: string[] = []) => {
  for (const item of tree) {
    result.push(item.code)
    if (item.children) {
      flattenTreeRoutes(item.children, result)
    }
  }
  return result
}

// 路由降级(展平)(最多只能有一个children嵌套,多了就生成平级的路由)
export const flatMultiLevelRoutes = (routes: AppRouteRecordRaw[]) => {
  const modules: AppRouteRecordRaw[] = cloneDeep(routes)
  for (let index = 0; index < modules.length; index++) {
    const route = modules[index]
    // 层级大于2就要生成二级路由
    if (!isMultipleRoute(route)) {
      continue
    }
    promoteRouteLevel(route)
  }

  return modules
}

// 层级是否大于2
const isMultipleRoute = (route: AppRouteRecordRaw) => {
  if (!route || !Reflect.has(route, 'children') || !route.children?.length) {
    return false
  }

  const children = route.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 生成二级路由
const promoteRouteLevel = (route: AppRouteRecordRaw) => {
  let router: Router | null = createRouter({
    routes: [route as RouteRecordRaw],
    history: createWebHashHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, route.children || [], route)
  router = null

  route.children = route.children?.map((item) => omit(item, 'children'))
}

// 添加所有子菜单
const addToChildren = (
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteRecordRaw
) => {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteRecordRaw)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}
