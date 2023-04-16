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

// 新增tag
const addTags = () => {
  const { name } = unref(currentRoute)
  if (name) {
    // selectedTag.value = unref(currentRoute)
    useTagsViewStore.addVisitedView(unref(currentRoute))
  }
  return false
}

// 关闭选中的tag
const closeSelectedTag = (view: RouteLocationNormalizedLoaded) => {
  if (view?.meta?.affix) return
  useTagsViewStore.delVisitedView(view)
}

// 只打开一个标签下拉框
const visibleChange = (visible: boolean, tagItem: RouteLocationNormalizedLoaded) => {
  if (visible) {
    for (const v of unref(itemRefs)) {
      const elDropdownMenuRef = v.dropdownMenuRef
      if (tagItem.fullPath !== v.tagItem.fullPath) {
        elDropdownMenuRef?.handleClose()
      }
    }
  }
}

const closeAllTags = () => {
  useTagsViewStore.delAllVisitedViews()
}

watch(
  () => currentRoute.value,
  () => {
    // 后续监听路由变化就增加标签
    addTags()
  }
)

onMounted(() => {
  initTags()
  // 页面初始化的时候就新增一次当前路由
  addTags()
})
</script>

<template>
  <EdropdownMenu
    :ref="itemRefs.set"
    :schema="[
      {
        label: '关闭全部',
        command: () => {
          closeAllTags()
        }
      }
    ]"
    @visible-change="visibleChange"
    v-for="item in visitedViews"
    :key="item.fullPath"
    :tag-item="item"
  >
  <div>
    <router-link :to="{ ...item }" custom v-slot="{ navigate }">
      <div
        @click="navigate"
      >
        {{ item?.meta?.title as string }}
        <el-icon
          v-if="!item.meta.affix"
          :size="12"
          class="element-icons el-icon-chahao"
          @click.prevent.stop="closeSelectedTag(item)"
        >
        </el-icon>
      </div>
    </router-link>
  </div>
  </EdropdownMenu>

</template>

<style scoped lang="scss"></style>