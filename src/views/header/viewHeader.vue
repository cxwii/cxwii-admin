<script lang="ts" setup>
import { inject } from 'vue'
import type { Ref } from 'vue'
import { Eltags } from '@/components/ElementPlus/Tags'
import { ElUserInfo } from '@/components/ElementPlus/UserInfo'
import { Elbreadcrumb } from '@/components/ElementPlus/Breadcrumb'
import { ElLocaleDropdown } from '@/components/ElementPlus/LocaleDropdown'

const isCollapse = inject('isCollapse') as Ref<boolean>

const change = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="header">
    <div class="collapseButton flex">
      <!-- 折叠左侧菜单栏按钮 -->
      <div>
        <el-icon
          v-if="!isCollapse"
          style="font-size: 30px; cursor: pointer"
          class="element-icons el-icon-shouqicaidan"
          @click="change"
        />
        <el-icon
          v-else
          style="font-size: 30px; cursor: pointer"
          class="element-icons el-icon-zhankaicaidan"
          @click="change"
        />
      </div>
      <!-- 面包屑导航 -->
      <div class="flex-1 m-5 select-none">
        <Elbreadcrumb />
      </div>
      <!-- i18n -->
      <ElLocaleDropdown class="mr-3" />
      <!-- 个人用户信息 -->
      <div class="userInfo rounded-full">
        <ElUserInfo />
      </div>
    </div>
    <div class="Etags">
      <Eltags />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  .collapseButton {
    height: 60%;
    align-items: center;
    justify-content: space-between;
    .userInfo {
      height: 30px;
      width: 30px;
      overflow: hidden;
    }
  }
  .Etags {
    width: 100%;
    height: 40%;
    border: 0.8px solid #eee;
    box-shadow: 0.1px 0.2px #d2cbcb;
  }
}
</style>
