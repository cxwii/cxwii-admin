<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
import { useCache } from '@/hooks/web/useCache'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
const { wsCache } = useCache()
const tagsViewStore = useTagsViewStore()
const { replace } = useRouter()
const userStore = useUserStore()

const userPic = userStore.getUserPic ? userStore.getUserPic : null

const toDocument = () => {
  window.open('https://github.com/cxwii/cxwii-admin')
}
const loginOut = () => {
  ElMessageBox.confirm(t('userInfo.ElMessageBox1'), t('userInfo.ElMessageBox2'), {
    confirmButtonText: t('userInfo.confirmButtonText'),
    cancelButtonText: t('userInfo.cancelButtonText'),
    type: 'warning'
  })
    .then(async () => {
      // 这里还要调个退出登录的api才行,现在单纯清空本地存储的用户信息
      wsCache.clear() // 清除本地所有缓存
      tagsViewStore.delAllViews() // 清除标签的所有缓存
      resetRouter() // 重置静态路由表
      replace('/login') // 去登录页
    })
    .catch(() => {})
}
</script>

<template>
  <ElDropdown trigger="click">
    <div class="flex items-center">
      <img v-if="userPic" :src="userPic" alt="" />
      <img v-else src="@/assets/imgs/user.png" alt="" />
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>
          <div @click="toDocument">{{ t('userInfo.Document') }}</div>
        </ElDropdownItem>
        <ElDropdownItem divided>
          <div @click="loginOut">{{ t('userInfo.loginOut') }}</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped lang="scss"></style>
