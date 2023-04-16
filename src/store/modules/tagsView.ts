import { defineStore } from 'pinia'
import { store } from '../index'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface tagsViewStateType {
  visitedViews: RouteLocationNormalizedLoaded[]
}

export const tagsViewStore = defineStore('tagsView', {
  state: (): tagsViewStateType => {
    return{
      visitedViews: []
    }
  },
  getters: {
    getVisitedViews(): RouteLocationNormalizedLoaded[] {
      return this.visitedViews
    }
  },
  actions: {
    // 新增标签
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      console.log('view.path :>> ', view.path);
      console.log('visitedViews :>> ', this.visitedViews);
      if (this.visitedViews.some((v) => v.path === view.path)) return
      // if (view.meta?.affix) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    // 删除标签
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
      const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
      this.visitedViews = affixTags
    }
  }
})

export const useTagsViewStore = () => {
  return tagsViewStore(store)
}