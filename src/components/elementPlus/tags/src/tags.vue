<script setup lang="ts">
import { watch, unref, computed, onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouterLinkProps } from 'vue-router'
import { EldropdownMenu, EldropdownMenuExpose } from '@/components/ElementPlus/DropdownMenu'
import { useTemplateRefsList } from '@vueuse/core'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { filterAffixTags } from './helper'
import { ElScrollbar } from 'element-plus'
import { usePermissionStore } from '@/store/modules/permission'
import { useScrollTo } from '@/hooks/event/useScrollTo'
import { useI18n } from '@/hooks/web/useI18n'

// i18n
const { t } = useI18n()

// tags的数据
const tagsViewStore = useTagsViewStore()

// 当前路由里的数据,用于监听变化触发添加进store
const { currentRoute, push, replace } = useRouter()

// tags初始化的时候的数据
const visitedViews = computed(() => tagsViewStore.getVisitedViews)

// <EdropdownMenu>的ref遍历出dom
const itemRefs = useTemplateRefsList<ComponentRef<typeof EldropdownMenu & EldropdownMenuExpose>>()

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
      tagsViewStore.addVisitedView(tag)
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

// 重新加载
const refreshSelectedTag = async (view?: RouteLocationNormalizedLoaded) => {
  if (!view) return
  tagsViewStore.delCachedView()
  const { path, query } = view
  await nextTick()
  // replace替换history里面的原有内容
  replace({
    path: '/redirect' + path,
    query: query
  })
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

// 滚动到选中的tag
const moveToCurrentTag = async () => {
  await nextTick()
  for (const v of unref(visitedViews)) {
    if (v.fullPath === unref(currentRoute).path) {
      moveToTarget(v)
      if (v.fullPath !== unref(currentRoute).fullPath) {
        tagsViewStore.updateVisitedView(unref(currentRoute))
      }

      break
    }
  }
}

// ElScrollbar的实例
const scrollbarRef = ref<ComponentRef<typeof ElScrollbar>>()

// 使用vueUse的useTemplateRefsList会有大坑
const tagLinksRefs = ref()
// const tagLinksRefs = useTemplateRefsList<RouterLinkProps>()

// 滚动的实现方法
const moveToTarget = (currentTag: RouteLocationNormalizedLoaded) => {
  const wrap$ = unref(scrollbarRef)?.wrapRef

  let firstTag: Nullable<RouterLinkProps> = null
  let lastTag: Nullable<RouterLinkProps> = null

  const tagList = unref(tagLinksRefs)

  //查找第一个标记和最后一个标记
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if ((firstTag?.to as RouteLocationNormalizedLoaded).fullPath === currentTag.fullPath) {
    // 直接滚动到0的位置
    const { start } = useScrollTo({
      el: wrap$!,
      position: 'scrollLeft',
      to: 0,
      duration: 500
    })
    start()
  } else if ((lastTag?.to as RouteLocationNormalizedLoaded).fullPath === currentTag.fullPath) {
    // 滚动到最后的位置
    const { start } = useScrollTo({
      el: wrap$!,
      position: 'scrollLeft',
      to: wrap$!.scrollWidth - wrap$!.offsetWidth,
      duration: 500
    })
    start()
  } else {
    //查找前标签和下一标签
    const currentIndex: number = tagList.findIndex(
      (item: any) => (item?.to as RouteLocationNormalizedLoaded).fullPath === currentTag.fullPath
    )
    const tgsRefs = document.getElementsByClassName('tagItem')

    const prevTag = tgsRefs[currentIndex - 1] as HTMLElement
    const nextTag = tgsRefs[currentIndex + 1] as HTMLElement

    //标签的偏移下一个标签的左后
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + 4

    //标记的偏移前一个标记的左前
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - 4

    if (afterNextTagOffsetLeft > unref(scrollLeftNumber) + wrap$!.offsetWidth) {
      const { start } = useScrollTo({
        el: wrap$!,
        position: 'scrollLeft',
        to: afterNextTagOffsetLeft - wrap$!.offsetWidth,
        duration: 500
      })
      start()
    } else if (beforePrevTagOffsetLeft < unref(scrollLeftNumber)) {
      const { start } = useScrollTo({
        el: wrap$!,
        position: 'scrollLeft',
        to: beforePrevTagOffsetLeft,
        duration: 500
      })
      start()
    }
  }
}

// 保存滚动位置
const scrollLeftNumber = ref(0)

// 滚动事件
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  scrollLeftNumber.value = scrollLeft as number
}

// 移动到某个位置
const move = (to: number) => {
  const wrap$ = unref(scrollbarRef)?.wrapRef
  const { start } = useScrollTo({
    el: wrap$!,
    position: 'scrollLeft',
    to: unref(scrollLeftNumber) + to,
    duration: 500
  })
  start()
}

onMounted(() => {
  initTags()
  // 页面初始化的时候就新增一次当前路由
  addTags()
})

watch(
  () => currentRoute.value,
  () => {
    // 后续监听路由变化就增加标签
    addTags()
    moveToCurrentTag()
  }
)
</script>

<template>
  <div class="tags flex">
    <span class="leftArrow cursor-pointer" @click="move(-200)">
      <el-icon class="element-icons el-icon-shuangzuojiantou-" />
    </span>
    <div class="tagView h-full flex-1 w-full">
      <ElScrollbar ref="scrollbarRef" @scroll="scroll">
        <div class="flex h-full">
          <EldropdownMenu
            :ref="itemRefs.set"
            :schema="[
              {
                label: t('tags.Reload'),
                disabled: selectedTag?.fullPath !== item.fullPath,
                command: () => {
                  refreshSelectedTag(item)
                }
              },
              {
                label: t('tags.Closelabel'),
                divided: true,
                command: () => {
                  closeSelectedTags(item)
                }
              },
              {
                label: t('tags.CloseLeftSide'),
                divided: true,
                disabled:
                  !!visitedViews?.length &&
                  (item.fullPath === visitedViews[0].fullPath ||
                    selectedTag?.fullPath !== item.fullPath),
                command: () => {
                  closeLeftTags()
                }
              },
              {
                label: t('tags.CloseRightSide'),
                disabled:
                  !!visitedViews?.length &&
                  (item.fullPath === visitedViews[visitedViews.length - 1].fullPath ||
                    selectedTag?.fullPath !== item.fullPath),
                command: () => {
                  closeRightTags()
                }
              },
              {
                label: t('tags.CloseOther'),
                command: () => {
                  closeOthersTags()
                }
              },
              {
                divided: true,
                label: t('tags.CloseAll'),
                command: () => {
                  closeAllTags()
                }
              }
            ]"
            @visible-change="visibleChange"
            v-for="item in visitedViews"
            :key="item.fullPath"
            :tag-item="item"
            :class="['tagItem', { 'is-active': isActive(item) }]"
          >
            <div>
              <router-link ref="tagLinksRefs" :to="{ ...item }" custom v-slot="{ navigate }">
                <div
                  @click="navigate"
                  class="h-full flex justify-center items-center whitespace-nowrap pl-5"
                >
                  {{ t(item?.meta?.title as string) }}
                  <el-icon
                    v-if="!item.meta.affix"
                    :size="12"
                    class="element-icons el-icon-chahao ml-1"
                    @click.prevent.stop="closeSelectedTags(item)"
                  />
                </div>
              </router-link>
            </div>
          </EldropdownMenu>
        </div>
      </ElScrollbar>
    </div>
    <span class="rightArrow cursor-pointer" @click="move(200)">
      <el-icon class="element-icons el-icon-shuangzuojiantou-" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.tags {
  width: 100%;
  height: 100%;
  .leftArrow {
    width: 33px;
    line-height: 31px;
    text-align: center;
    border-right: 1px solid #eee;
    margin-right: 1px;
    box-shadow: 0.2px 0px #d2cbcb;
  }
  .rightArrow {
    width: 33px;
    line-height: 30px;
    text-align: center;
    border-right: 1px solid #eee;
    margin-left: 1px;
    transform: rotate(180deg);
    box-shadow: 0.2px 0px #d2cbcb;
  }
  .tagView {
    overflow: hidden;
    :deep(.el-scrollbar__view) {
      height: 100% !important;
    }
    .is-active {
      color: #ffffff;
      background-color: #409eff;
      border: 1px solid #409eff;
    }
    .tagItem {
      position: relative;
      top: 2px;
      height: calc(100% - 4px);
      padding-right: 25px;
      margin-left: 4px;
      font-size: 13px;
      cursor: pointer;
      border: 1px solid #d9d9d9;
      user-select: none;
    }
  }
}
</style>
