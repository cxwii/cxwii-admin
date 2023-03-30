<script lang="ts" setup>
import { inject } from 'vue'
import type { Ref } from 'vue'

const isCollapse = inject('isCollapse') as Ref<boolean>

const change = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="header">
    <div @click="change" class="collapseButton">
      <el-icon
        v-if="!isCollapse"
        style="font-size: 30px;cursor:pointer;"
        class="element-icons el-icon-shouqicaidan"
      >
      </el-icon>
      <el-icon
        v-else
        style="font-size: 30px;cursor:pointer;"
        class="element-icons el-icon-zhankaicaidan">
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  .collapseButton {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>