<script lang="tsx" setup>
import { ElMenu, ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { useAttrs, useSlots, computed } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteMeta } from 'vue-router'
import { addSlashToStart } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
const attrs = useAttrs()
const slots = useSlots()
const permissionStore = usePermissionStore()

const menuRouters = computed(() => permissionStore.getAddRouters)

// 渲染一级Menu的模板
const useRenderMenuItem = (menuRouters: AppRouteRecordRaw[]) => {
  const renderMenuItem = menuRouters.map((item) => {
    if (item.hasOwnProperty('children') && (item.children ? item.children.length : 0) == 0) {
      return (
        <ElMenuItem index={item.path}>
          <ElIcon class={`element-icons ${item.meta.icon}`}></ElIcon>
          <span>{t(item.meta.title)}</span>
        </ElMenuItem>
      )
    } else if (item.hasOwnProperty('children') && (item.children ? item.children.length : 0) == 1) {
      let path = `${addSlashToStart(item.path)}${addSlashToStart(item.children![0].path)}`
      let icon = item.children![0].meta.icon
        ? item.children![0].meta.icon
        : item.meta.icon
        ? item.meta.icon
        : 'el-icon-hollow-question'
      let title = item.children![0].meta.title
        ? item.children![0].meta.title
        : item.meta.title
        ? () => item.meta.title
        : '未知标题'
      return (
        <ElMenuItem index={path}>
          <ElIcon class={`element-icons ${icon}`}></ElIcon>
          <span>{t(title)}</span>
        </ElMenuItem>
      )
    } else {
      let meta = item.meta
        ? item.meta
        : {
            title: '未知标题',
            icon: 'el-icon-hollow-question'
          }
      return (
        <ElSubMenu index={item.name}>
          {{
            title: () => renderMenuTitleORIcon(meta),
            default: () => useRenderSubMenu(item.children as AppRouteRecordRaw[], item.path)
          }}
        </ElSubMenu>
      )
    }
  })
  return renderMenuItem
}

// 渲染二级以及后续Menu的模板
const useRenderSubMenu = (menuRouters: AppRouteRecordRaw[], parentPath: string) => {
  const renderSubMenu = menuRouters.map((item) => {
    if (item.hasOwnProperty('children')) {
      let meta = item.meta
        ? item.meta
        : {
            title: '未知标题'
          }
      return (
        <ElSubMenu index={item.name}>
          {{
            title: () => renderMenuTitleORIcon(meta),
            // 还有子菜单就接着递归到没有
            default: () =>
              useRenderSubMenu(
                item.children as AppRouteRecordRaw[],
                `${addSlashToStart(parentPath)}${addSlashToStart(item.path)}`
              )
          }}
        </ElSubMenu>
      )
    } else {
      let meta = item.meta
        ? item.meta
        : {
            title: '未知标题'
          }
      return (
        <ElMenuItem index={`${addSlashToStart(parentPath)}${addSlashToStart(item.path)}`}>
          {{
            title: () => renderMenuTitleORIcon(meta)
          }}
        </ElMenuItem>
      )
    }
  })
  return renderSubMenu
}

// 渲染Title和Icon的模板
const renderMenuTitleORIcon = (meta: RouteMeta) => {
  const { title = '未知标题', icon } = meta

  return icon ? (
    <>
      <ElIcon class={`element-icons ${meta.icon}`}></ElIcon>
      <span>{t(title as string)}</span>
    </>
  ) : (
    <span>{t(title as string)}</span>
  )
}

const app = () => {
  return (
    <ElMenu {...attrs}>
      {slots.default ? slots.default() : useRenderMenuItem(menuRouters.value)}
    </ElMenu>
  )
}
</script>

<template>
  <app />
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
