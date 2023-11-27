<script lang="ts" setup>
import { inject } from 'vue'
import { UseSvg } from '@/components/UseSvg'
import { useRouter, useRoute } from 'vue-router'
import { ElVerticalmenu } from '@/components/ElementPlus/VerticalMenu'

const { push } = useRouter()
const route = useRoute()

const isCollapse = inject('isCollapse')

const toHome = () => {
  push({ path: '/home' })
}
</script>

<template>
  <div class="aside">
    <div class="log">
      <UseSvg name="vuex-store" class="logoSvg" @click="toHome" />
      <div class="logText">cxwii-Admin</div>
    </div>

    <ElVerticalmenu
      :default-active="route.path"
      class="elMenu"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#d3d6db"
      active-text-color="#ffffff"
      :router="true"
    />
  </div>
</template>

<style scoped lang="scss">
.aside {
  width: 100%;
  height: 100%;
  background-color: #001529;

  .log {
    position: sticky;
    top: 0;
    z-index: 999;
    height: 56px;
    background-color: #001529;
    border-bottom: 2px solid #001529;
    display: flex;
    align-items: center;
    color: #ffffff;

    .logoSvg {
      width: 56px;
      height: 100%;
      cursor: pointer;
    }

    .logText {
      position: absolute;
      top: 0;
      left: 56px;
      z-index: -1;
      margin-left: 10px;
      display: flex;
      height: 100%;
      width: 100px;
      align-items: center;
    }
  }

  // 解决菜单折叠时出现1px缝隙问题
  .elMenu {
    border: none;
  }
}
</style>
