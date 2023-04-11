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
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      if (view.meta?.noTagsView) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    }
  }
})

export const useTagsViewStore = () => {
  return tagsViewStore(store)
}