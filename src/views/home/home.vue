<script lang="ts" setup>
import { ref, provide } from 'vue'
import viewHeader from '@/views/header/viewHeader.vue'
import viewAside from '@/views/aside/viewAside.vue'

const isCollapse = ref(false)
provide('isCollapse', isCollapse)

</script>

<template>
  <el-container class="container">
    <el-aside class="elAside">
      <viewAside></viewAside>
    </el-aside>
    <el-container>
      <el-header>
        <viewHeader></viewHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important
}
.container {
  width: 100%;
  height: 100%;
  .elAside{
    width: auto;
    // 隐藏menu的滚动条
    user-select: none;
  }
}
</style>