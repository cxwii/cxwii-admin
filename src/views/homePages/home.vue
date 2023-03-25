<script lang="ts" setup>

</script>

<template>
  <el-container class="container">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;

  .header {
    background-color: red;
  }

  .aside {
    background-color: aqua;
    height: 100%;
  }

  .main {
    background-color: blueviolet;
  }
}
</style>