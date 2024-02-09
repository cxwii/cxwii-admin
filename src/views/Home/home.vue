<script lang="ts" setup>
import { ref, provide, computed } from 'vue'
import viewHeader from '@/views/Header/viewHeader.vue'
import viewAside from '@/views/Aside/viewAside.vue'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useUserStore } from '@/store/modules/user'
import { MainContent } from '@/components/MainContent'
import { Eldrawer } from '@/components/ElementPlus/Drawer'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userStore = useUserStore()
const pageLoading = computed(() => userStore.getPageLoading)
const isCollapse = ref(false)
const { push, currentRoute } = useRouter()

provide('isCollapse', isCollapse)

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})

const toTestPage = () => {
  push({ path: '/testPage' })
}

const getPage = () => {
  console.log('当前页面位置 :>> ', (currentRoute.value.matched[currentRoute.value.matched.length - 1].components?.default as any).__file)
}
</script>

<template>
  <el-container class="myElContainer">
    <el-aside class="myElAside">
      <viewAside />
    </el-aside>
    <el-container>
      <el-header class="myElHeader">
        <viewHeader />
      </el-header>
      <el-main class="myElMain bg-[#f5f7f9] dark:bg-[#282727]" :v-loading="pageLoading">
        <router-view>
          <template #default="{ Component, route }">
            <MainContent>
              <keep-alive :include="getCaches">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </MainContent>
          </template>
        </router-view>
        <Eldrawer :title="t('config.configTitle')">
          <div>
            <el-divider content-position="center">{{ t('config.TestPage') }}</el-divider>
            <div class="w-full flex justify-center">
              <el-button @click="toTestPage">🔬</el-button>
            </div>
          </div>
          <div>
            <el-divider content-position="center">{{ t('config.getPage') }}</el-divider>
            <div class="w-full flex justify-center">
              <el-button @click="getPage">🔍</el-button>
            </div>
          </div>
        </Eldrawer>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important;
}
.myElContainer {
  width: 100%;
  height: 100%;
  .myElAside {
    width: auto;
    // 隐藏menu的滚动条
    user-select: none;
  }
  .myElHeader {
    height: 80px;
    margin-bottom: 5px;
  }
  .myElMain {
    border-top: 0.8px solid #d9d9d9;
  }
}
</style>
