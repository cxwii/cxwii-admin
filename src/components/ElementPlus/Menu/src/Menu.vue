<script lang="tsx" setup>
import { ElMenu, ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { useAttrs, useSlots } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteMeta } from 'vue-router'

const attrs = useAttrs()
const slots = useSlots()
const permissionStore = usePermissionStore()
const menuRouter = permissionStore.getAddRouters

// 渲染一级Menu的模板
const useRenderMenuItem = (
  menuRouter: AppRouteRecordRaw[]
) => {
  const renderMenuItem = menuRouter.map((item) => {
    if (item.meta.isSubMenu) {
      return (
        <ElSubMenu index={item.name}>
          {{
            title: () => renderMenuTitleORIcon(item.meta),
            default: () => useRenderSubMenu(item.children as AppRouteRecordRaw[])
          }}
        </ElSubMenu>
      )
    } else {
      return (
        <ElMenuItem index={item.meta.menuPath}>
          <ElIcon class={`element-icons ${item.meta.icon}`}></ElIcon>
          <span>{item.meta.title}</span>
        </ElMenuItem>
      )
    }
  })
  return renderMenuItem
}

// 渲染二级以及后续Menu的模板
const useRenderSubMenu = (
  menuRouter: AppRouteRecordRaw[]
) => {
  const renderSubMenu = menuRouter.map((item) => {
    if (item.meta.isSubMenu) {
      return(
        <ElSubMenu index={item.name}>
          {{
            title: () => renderMenuTitleORIcon(item.meta),
            // 还有子菜单就接着递归到没有
            default: () => useRenderSubMenu(item.children as AppRouteRecordRaw[])
          }}
        </ElSubMenu>
      )
    } else {
      return(
        <ElMenuItem index={item.meta.menuPath}>
          {{
            title: () => renderMenuTitleORIcon(item.meta),
          }}
        </ElMenuItem>
      )
    }
  })
  return renderSubMenu
}

// 渲染Title和Icon的模板
const renderMenuTitleORIcon = (meta: RouteMeta) => {
  const { title = 'Please set title', icon } = meta

  return icon ? (
    <>
      <ElIcon class={`element-icons ${meta.icon}`}></ElIcon>
      <span>{title as string}</span>
    </>
  ) : (
    <span>{title as string}</span>
  )
}

const app = () => {
  return (
    <ElMenu
      {...attrs}
    >
      {
        slots.default ? slots.default() : useRenderMenuItem(menuRouter)
      }
    </ElMenu>
  )
}
</script>

<template>
  <app>
  </app>
</template>

<style lang="scss">
/*
elUi样式(不要加scoped会导致无法穿透:deep也无法穿透)
*/
//菜单鼠标移至样式
.el-menu .el-menu-item:hover {
  background-color: rgb(14 39 64);
  color: #ffffff;
}
// 菜单激活样式
.el-menu .el-menu-item.is-active {
  background-color: #409eff;
}

// 设置菜单子栏宽度,排除展开时的,不然会有bug
.el-menu:not(.el-menu--collapse) {
  width: 180px;
}
// 选中子菜单时折叠菜单,父菜单高亮
.el-menu--collapse > .is-active > .el-sub-menu__title {
  position: relative;
  background-color: #409eff !important;
}
</style>