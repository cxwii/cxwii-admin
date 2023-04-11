<script setup lang="ts">
import { watch, unref, computed, onMounted, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRouter, RouterLinkProps } from 'vue-router'
import { EdropdownMenu, EdropdownMenuExpose } from '@/components/elementPlus/dropdownMenu'
import { useTemplateRefsList } from '@vueuse/core'
import { tagsViewStore } from '@/store/modules/tagsView'
import { filterAffixTags } from './helper'

import { usePermissionStore } from '@/store/modules/permission'

// tags的数据
const useTagsViewStore = tagsViewStore()

// 当前路由里的数据,用于监听变化触发添加进store
const { currentRoute } = useRouter()

// tags初始化的时候的数据
const visitedViews = computed(() => useTagsViewStore.getVisitedViews)

// <EdropdownMenu>的ref遍历出dom
const itemRefs = useTemplateRefsList<ComponentRef<typeof EdropdownMenu & EdropdownMenuExpose>>()

//
const affixTagArr = ref<RouteLocationNormalizedLoaded[]>([])

const permissionStore = usePermissionStore()
const routers = computed(() => permissionStore.getRouters)

// 初始化tag
const initTags = () => {
  console.log('unref(routers) :>> ', unref(routers))
  affixTagArr.value = filterAffixTags(unref(routers))
  console.log('affixTagArr.value :>> ', affixTagArr.value)
  for (const tag of unref(affixTagArr)) {
    if (tag.name) {
      useTagsViewStore.addVisitedView(tag)
    }
  }
}

// 只打开一个标签下拉框
const visibleChange = (visible: boolean, tagItem: RouteLocationNormalizedLoaded) => {
  if (visible) {
    for (const v of unref(itemRefs)) {
      console.log('tagItem.fullPath :>> ', tagItem.fullPath)
      console.log('v.tagItem.fullPath :>> ', v.tagItem.fullPath)
      const elDropdownMenuRef = v.dropdownMenuRef
      if (tagItem.fullPath !== v.tagItem.fullPath) {
        elDropdownMenuRef?.handleClose()
      }
    }
  }
}

const test = (a: any) => {
  console.log('test :>> ', a)
}

watch(
  () => currentRoute.value,
  () => {
    console.log('监听到 :>> ', currentRoute.value)
  }
)

onMounted(() => {
  initTags()
})
</script>

<template>
  <EdropdownMenu
    :ref="itemRefs.set"
    :schema="[
      {
        label: 'common.reload',
        command: () => {
          test(1)
        }
      }
    ]"
    @visible-change="visibleChange"
    v-for="item in visitedViews"
    :key="item.fullPath"
    :tag-item="item"
  >
    {{ item?.meta?.title as string }}
  </EdropdownMenu>

</template>

<style scoped lang="scss"></style>