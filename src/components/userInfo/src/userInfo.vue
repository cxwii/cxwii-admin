<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
import { useCache } from '@/hook/web/useCache'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'

const { wsCache } = useCache()
const tagsViewStore = useTagsViewStore()
const { replace } = useRouter()

const toDocument = () => {
  window.open('https://github.com/cxwii/cxwii-admin')
}
const loginOut = () => {
  ElMessageBox.confirm(
    '您是否确认退出系统?退出后需重新登录!',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    // 这里还要调个退出登录的api才行,现在单纯清空本地存储的用户信息
    wsCache.clear() // 清除本地所有缓存
    tagsViewStore.delAllViews() // 清除标签的所有缓存
    resetRouter() // 重置静态路由表
    replace('/login') // 去登录页
  }).catch(() => {})
}
</script>

<template>
  <ElDropdown trigger="click">
    <div class="flex items-center">
      <img
        src="@/assets/imgs/user.png"
        alt=""
      />
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>
          <div @click="toDocument">项目地址</div>
        </ElDropdownItem>
        <ElDropdownItem divided>
          <div @click="loginOut">退出登录</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped lang="scss">

</style>