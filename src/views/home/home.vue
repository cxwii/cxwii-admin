<script lang="ts" setup>
import { ref, provide, computed } from 'vue'
import viewHeader from '@/views/header/viewHeader.vue'
import viewAside from '@/views/aside/viewAside.vue'
import { useTagsViewStore } from '@/store/modules/tagsView'

const isCollapse = ref(false)
provide('isCollapse', isCollapse)


const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})

</script>

<template>
  <el-container class="elContainer">
    <el-aside class="elAside">
      <viewAside></viewAside>
    </el-aside>
    <el-container>
      <el-header class="elHeader">
        <viewHeader></viewHeader>
      </el-header>
      <el-main>
        <router-view>
          <template #default="{ Component, route }">
            <keep-alive :include="getCaches">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </template>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important
}
.elContainer {
  width: 100%;
  height: 100%;
  .elAside{
    width: auto;
    // 隐藏menu的滚动条
    user-select: none;
  }
  .elHeader {
    height: 80px;
  }
}
</style>