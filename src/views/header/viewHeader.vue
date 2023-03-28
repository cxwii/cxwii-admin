<script lang="ts" setup>
import { inject } from 'vue'

const isCollapse = inject('isCollapse')

</script>

<template>
  <div class="header">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
  </div>
</template>

<style scoped lang="scss">
.header {

}
</style>