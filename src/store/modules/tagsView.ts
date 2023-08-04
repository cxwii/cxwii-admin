import { defineStore } from 'pinia'
import { store } from '../index'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { getRawRoute } from '@/utils/routerHelper'
import router from '@/router'
import { findIndex } from '@/utils'

export interface tagsViewStateType {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: Set<string>
}

export const tagsViewStore = defineStore('tagsView', {
  state: (): tagsViewStateType => {
    return {
      // 使用的视图
      visitedViews: [],
      // 用于缓存的视图(这样在keep-alive中实现动态缓存,节约性能)
      cachedViews: new Set()
    }
  },
  getters: {
    getVisitedViews(): RouteLocationNormalizedLoaded[] {
      return this.visitedViews
    },
    getCachedViews(): string[] {
      return Array.from(this.cachedViews)
    }
  },
  actions: {
    /* 
      实际在外面用的方法
      每个方法里面都调用addCachedView()就可以实时的更新缓存里面的内容
    */
    // 新增一个tag
    addView(view: RouteLocationNormalizedLoaded): void {
      this.addVisitedView(view)
      this.addCachedView()
    },
    // 删除选中tag
    delView(view: RouteLocationNormalizedLoaded) {
      this.delVisitedView(view)
      this.addCachedView()
    },
    // 删除所有的tag
    delAllViews() {
      this.delAllVisitedViews()
      this.addCachedView()
    },
    // 删除其他tag
    delOthersViews(view: RouteLocationNormalizedLoaded) {
      this.delOthersVisitedViews(view)
      this.addCachedView()
    },
    // 删除左侧
    delLeftViews(view: RouteLocationNormalizedLoaded) {
      const index = findIndex<RouteLocationNormalizedLoaded>(
        this.visitedViews,
        (v) => v.path === view.path
      )
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v?.meta?.affix || v.path === view.path || i > index
        })
        this.addCachedView()
      }
    },
    // 删除右侧
    delRightViews(view: RouteLocationNormalizedLoaded) {
      const index = findIndex<RouteLocationNormalizedLoaded>(
        this.visitedViews,
        (v) => v.path === view.path
      )
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v?.meta?.affix || v.path === view.path || i < index
        })
        this.addCachedView()
      }
    },

    /* 各种操作方法 */
    // 新增缓存
    addCachedView() {
      const cacheMap: Set<string> = new Set()
      for (const v of this.visitedViews) {
        const item = getRawRoute(v)
        const needCache = !item.meta?.noCache
        if (!needCache) {
          continue
        }
        const name = item.name as string
        cacheMap.add(name)
      }
      // 如果和原缓存一样就直接忽略
      if (Array.from(this.cachedViews).sort().toString() === Array.from(cacheMap).sort().toString())
        return
      this.cachedViews = cacheMap
    },
    // 删除缓存
    delCachedView() {
      const route = router.currentRoute.value
      const index = findIndex<string>(this.getCachedViews, (v) => v === route.name)
      if (index > -1) {
        this.cachedViews.delete(this.getCachedViews[index])
      }
    },
    // 新增标签
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      if (view.meta?.noTagsView) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    // 删除选中标签
    delVisitedView(view: RouteLocationNormalizedLoaded) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    // 关闭全部
    delAllVisitedViews() {
      // const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
      this.visitedViews = []
    },
    // 删除其他
    delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v?.meta?.affix || v.path === view.path
      })
    },
    // 滚动到选中的tag里面用于刷新视图
    updateVisitedView(view: RouteLocationNormalizedLoaded) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})

export const useTagsViewStore = () => {
  return tagsViewStore(store)
}
