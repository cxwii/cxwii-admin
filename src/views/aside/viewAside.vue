<script lang="ts" setup>
import { inject, watch } from 'vue'
import logoSvg from '@/components/logosSvg/logoSvg.vue'

const isCollapse = inject('isCollapse')

</script>

<template>
  <div class="aside">
    <div class="log">
      <logoSvg name="vuex-store" class="logoSvg"></logoSvg>
      <div class="logText">cxw-admin</div>
    </div>

    <el-menu
      default-active="1"
      class="elMenu"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#d3d6db"
      active-text-color="#ffffff"
    >

      <el-menu-item index="1">
        <el-icon class="element-icons el-icon-shouye1"></el-icon>
        <template #title>
          <div class="elMenuTitle">首页</div>
        </template>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon class="element-icons el-icon-tubiao-zhexiantu"></el-icon>
          <span>图表</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="2-1">柱图</el-menu-item>
          <el-menu-item index="2-2">饼图</el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>

      <el-menu-item index="3">
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
          <el-menu-item index="4-1">普通菜单</el-menu-item>
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

      <el-menu-item index="5">
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
:deep(.el-menu .el-menu-item:hover) {
  // 菜单鼠标移至样式
  background-color: rgb(14 39 64);
  color: #ffffff;
}
:deep(.el-menu .el-menu-item.is-active) {
  // 菜单激活样式
  background-color: #409eff;
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
  .elMenu {
    // 解决菜单折叠时出现1px缝隙问题
    border: none;
    .elMenuTitle {
      // 撑开展开栏
      margin-right: 80px;
    }
  }
}
</style>