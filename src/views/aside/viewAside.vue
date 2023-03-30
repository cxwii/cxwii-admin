<script lang="ts" setup>
import { inject, ref, toRaw } from 'vue'
import logoSvg from '@/components/logosSvg/logoSvg.vue'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const isCollapse = inject('isCollapse')

const toHome = () => {
  push({ path: "/home" })
}

</script>

<template>
  <div class="aside">
    <div class="log">
      <logoSvg name="vuex-store" class="logoSvg" @click="toHome"></logoSvg>
      <div class="logText">cxw-admin</div>
    </div>

    <el-menu
      default-active="/home/homePage"
      class="elMenu"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#d3d6db"
      active-text-color="#ffffff"
      :router="true"
    >

      <el-menu-item index="/home/homePage">
        <el-icon class="element-icons el-icon-shouye1"></el-icon>
        <template #title>
          首页
        </template>
      </el-menu-item>

      <el-sub-menu index="2" id="2" ref="cxw" style="background-color: red !important;">
        <template #title>
          <el-icon class="element-icons el-icon-tubiao-zhexiantu"></el-icon>
          <span>图表</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/chart/barChart">柱图</el-menu-item>
          <el-menu-item index="/chart/lineChart">饼图</el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>

      <el-menu-item index="/table/table">
        <el-icon class="element-icons el-icon-biaodan"></el-icon>
        <template #title>表格</template>
      </el-menu-item>

      <el-sub-menu index="4">
        <template #title>
          <el-icon class="element-icons el-icon-caidan"></el-icon>
          <span>菜单</span>
        </template>

        <el-menu-item-group>
          <template #title><span>菜单组名</span></template>
          <el-menu-item index="/menu/menu">普通菜单</el-menu-item>
          <el-menu-item index="4-2" disabled>禁用菜单</el-menu-item>
        </el-menu-item-group>

        <el-sub-menu index="4-3">
          <template #title>嵌套菜单</template>
          <el-menu-item index="4-3-1">菜单1</el-menu-item>
          <el-menu-item index="4-3-2">菜单2</el-menu-item>

          <el-sub-menu index="4-3-3">
            <template #title>嵌套菜单2</template>
            <el-menu-item index="4-3-3-1">菜单1</el-menu-item>
            <el-menu-item index="4-3-3-2">菜单2</el-menu-item>
          </el-sub-menu>

        </el-sub-menu>
      </el-sub-menu>

      <el-menu-item index="/richText/text">
        <el-icon class="element-icons el-icon-fuwenben"></el-icon>
        <template #title>文本</template>
      </el-menu-item>

    </el-menu>

  </div>
</template>

<style scoped lang="scss">
/*
elUi样式
*/
// 菜单鼠标移至样式
.el-menu .el-menu-item:hover {
  background-color: rgb(14 39 64);
  color: #ffffff;
}
// 菜单激活样式
.el-menu .el-menu-item.is-active {
  background-color: #409eff;
}
// 设置菜单子栏宽度,排除展开时的,不然会有bug
.el-menu:not(.el-menu--collapse) {
  width: 180px;
}
// 选中子菜单时折叠菜单,父菜单高亮
:deep(.el-menu--collapse > .is-active > .el-sub-menu__title) {
  position: relative;
  background-color: #409eff !important;
}

/*
组件样式
*/
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
      cursor:pointer;
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