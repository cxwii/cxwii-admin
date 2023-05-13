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
const { currentRoute, push } = useRouter()

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
  if (isActive(view)) {
    toLastView()
  }
}

// 关闭所有标签
const closeAllTags = () => {
  tagsViewStore.delAllViews()
  toLastView()
}

// 关闭其他
const closeOthersTags = () => {
  tagsViewStore.delOthersViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 关闭左侧
const closeLeftTags = () => {
  tagsViewStore.delLeftViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 关闭右侧
const closeRightTags = () => {
  tagsViewStore.delRightViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 只打开一个标签的下拉框(同时打开时关闭前一个)
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

// 是否是当前tag(用于激活当前蓝色高亮)
const isActive = (route: RouteLocationNormalizedLoaded): boolean => {
  return route.path === unref(currentRoute).path
}

// 跳转到最后一个
const toLastView = () => {
  const visitedViews = tagsViewStore.getVisitedViews
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    push(latestView)
  } else {
    if (
      unref(currentRoute).path === permissionStore.getAddRouters[0].path ||
      unref(currentRoute).path === permissionStore.getAddRouters[0].redirect
    ) {
      addTags()
      return
    }
    // 你可以自己设定路线
    push(permissionStore.getAddRouters[0].path)
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
  <div class="flex h-full">
    <EdropdownMenu
      :ref="itemRefs.set"
      :schema="[
        {
          label: '关闭左侧',
          disabled:
            !!visitedViews?.length &&
            (item.fullPath === visitedViews[0].fullPath ||
              selectedTag?.fullPath !== item.fullPath),
          command: () => {
            closeLeftTags()
          }
        },
        {
          divided: true,
          label: '关闭右侧',
          disabled:
            !!visitedViews?.length &&
            (item.fullPath === visitedViews[visitedViews.length - 1].fullPath ||
              selectedTag?.fullPath !== item.fullPath),
          command: () => {
            closeRightTags()
          }
        },
        {
          divided: true,
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
      :class="[
        'item',
        { 'is-active': isActive(item) }
      ]"
    >
      <div>
        <router-link :to="{ ...item }" custom v-slot="{ navigate }">
          <div
            @click="navigate"
            class="
            h-full
            flex
            justify-center
            items-center
            whitespace-nowrap
            pl-5"
          >
            {{ item?.meta?.title as string }}
            <el-icon
              v-if="!item.meta.affix"
              :size="12"
              class="element-icons el-icon-chahao ml-1"
              @click.prevent.stop="closeSelectedTags(item)"
            >
            </el-icon>
          </div>
        </router-link>
      </div>
    </EdropdownMenu>
  </div>
</template>

<style scoped lang="scss">
.is-active {
  color: #ffffff;
  background-color: #409eff;
  border: 1px solid #409eff;
}
.item{
  position: relative;
  top: 2px;
  height: calc(100% - 4px);
  padding-right: 25px;
  margin-left: 4px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
}
</style>