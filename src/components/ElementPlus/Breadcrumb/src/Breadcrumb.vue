<script lang="tsx" setup>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { watch, ref, TransitionGroup } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteLocationMatched } from 'vue-router'
import { useI18n } from '@/hooks/web/useI18n'

// i18n
const { t } = useI18n()

const { currentRoute } = useRouter()

// 面包屑列表
let breadcrumbList = ref<RouteLocationMatched[]>([])

const useRenderBreadcrumb = () => {
  return (
    <ElBreadcrumb separator="/">
      <TransitionGroup appear enterActiveClass="animate__animated animate__fadeInRight">
        {useRenderBreadcrumbItem()}
      </TransitionGroup>
    </ElBreadcrumb>
  )
}

const useRenderBreadcrumbItem = () => {
  // 简化数据
  let renderBreadcrumbItemData = breadcrumbList.value.map((item) => {
    return {
      name: item.name,
      title: item.meta.title
    }
  })

  // 两层重复嵌套时过滤重复数据
  if (
    renderBreadcrumbItemData.length == 2 &&
    (renderBreadcrumbItemData[0].title == renderBreadcrumbItemData[1].title ||
      renderBreadcrumbItemData[0].title == undefined)
  ) {
    renderBreadcrumbItemData = [renderBreadcrumbItemData[1]]
  }

  return renderBreadcrumbItemData.map((item) => {
    return <ElBreadcrumbItem key={item!.name}>{t(item.title as string)}</ElBreadcrumbItem>
  })
}

const getBreadcrumbData = () => {
  breadcrumbList.value = currentRoute.value.matched
}

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    if (route.path.startsWith('/redirect/')) {
      return
    }
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

const app = () => {
  return <>{useRenderBreadcrumb()}</>
}
</script>

<template>
  <app />
</template>

<style scoped lang="scss"></style>
