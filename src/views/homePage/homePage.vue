<script lang="tsx" setup>
import { constantRoutes, asyncRouter } from '@/router'
import { loginApi, getRouterApi } from '@/api/User'
import { unref, ref, watch, TransitionGroup } from 'vue'
import { flatMultiLevelRoutes, generateRoutesFn1 } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { ElBreadcrumb, ElBreadcrumbItem, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteLocationMatched } from 'vue-router'

const { currentRoute } = useRouter()
const { t } = useI18n()
let text = ref()

const tset = async () => {
  console.log('数据 :>> ', text)
}

const tset2 = () => {
  return <>{t('login.loginText')}</>
}

import { ElMenu, ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { useAttrs, useSlots, computed } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteMeta } from 'vue-router'
import { addSlashToStart } from '@/utils/routerHelper'
const attrs = useAttrs()
const slots = useSlots()
const permissionStore = usePermissionStore()

const menuRouters = computed(() => permissionStore.getAddRouters)

// 渲染一级Menu的模板
const useRenderMenuItem = (menuRouters: AppRouteRecordRaw[]) => {
  const renderMenuItem = menuRouters.map((item) => {
    if (item.hasOwnProperty('children') && (item.children ? item.children.length : 0) == 0) {
      console.log('ciadan :>> ', t(item.meta.title))
      return (
        <ElMenuItem index={item.path}>
          <ElIcon class={`element-icons ${item.meta.icon}`}></ElIcon>
          <span>{item.meta.title}</span>
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
          <span>{title}</span>
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
      <span>{title as string}</span>
    </>
  ) : (
    <span>{title as string}</span>
  )
}

const app = () => {
  return (
    <>
      <ElMenu {...attrs}>
        {slots.default ? slots.default() : useRenderMenuItem(menuRouters.value)}
      </ElMenu>
      {tset2()}
    </>
  )
}
</script>

<template>
  <app />
  <!-- <textarea style="width: 300px;height: 300px;" v-model="text"></textarea>
  <div v-html="text"></div>
  <button @click="tset">测试</button>
  {{ t('router.homePage') }} -->
</template>

<style scoped lang="scss"></style>
