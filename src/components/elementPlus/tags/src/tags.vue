<script setup lang="ts">
import { watch, unref, computed, onMounted, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { EdropdownMenu, EdropdownMenuExpose } from '@/components/elementPlus/dropdownMenu'
import { useTemplateRefsList } from '@vueuse/core'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { filterAffixTags } from './helper'

import { usePermissionStore } from '@/store/modules/permission'

// tags的数据
const tagsViewStore = useTagsViewStore()

// 当前路由里的数据,用于监听变化触发添加进store
const { currentRoute } = useRouter()

// tags初始化的时候的数据
const visitedViews = computed(() => tagsViewStore.getVisitedViews)

// <EdropdownMenu>的ref遍历出dom
const itemRefs = useTemplateRefsList<ComponentRef<typeof EdropdownMenu & EdropdownMenuExpose>>()

// 初始化时过滤完的router的列表
const affixTagArr = ref<RouteLocationNormalizedLoaded[]>([])

// 根据情况是用静态路由表来初始化tag列表还是动态的
const permissionStore = usePermissionStore()
const routers = computed(() => permissionStore.getRouters)

// 存储当前激活的路由地址,用于关闭其他的方法
const selectedTag = ref<RouteLocationNormalizedLoaded>()

// 初始化tag
const initTags = () => {
  affixTagArr.value = filterAffixTags(unref(routers))
  for (const tag of unref(affixTagArr)) {
    if (tag.name) {
      tagsViewStore.addView(tag)
    }
  }
}

// 新增tag
const addTags = () => {
  const { name } = unref(currentRoute)
  if (name) {
    selectedTag.value = unref(currentRoute)
    tagsViewStore.addView(unref(currentRoute))
  }
  return false
}

// 关闭选中的标签
const closeSelectedTags = (view: RouteLocationNormalizedLoaded) => {
  if (view?.meta?.affix) return
  tagsViewStore.delView(view)
}

// 关闭所有标签
const closeAllTags = () => {
  tagsViewStore.delAllViews()
}

// 关闭其他
const closeOthersTags = () => {
  tagsViewStore.delOthersViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 只打开一个标签的下拉框
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
      },
      {
        divided: true,
        label: '关闭其他',
        command: () => {
          closeOthersTags()
        }
      },
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
        class=""
      >
        {{ item?.meta?.title as string }}
        <el-icon
          v-if="!item.meta.affix"
          :size="12"
          class="element-icons el-icon-chahao"
          @click.prevent.stop="closeSelectedTags(item)"
        >
        </el-icon>
      </div>
    </router-link>
  </div>
  </EdropdownMenu>

</template>

<style scoped lang="scss"></style>