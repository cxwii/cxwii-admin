<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { Etags } from '@/components/elementPlus/tags';

const isCollapse = inject('isCollapse') as Ref<boolean>

const change = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="header">
    <div class="collapseButton">
      <el-icon
        v-if="!isCollapse"
        style="font-size: 30px;cursor:pointer;"
        class="element-icons el-icon-shouqicaidan"
        @click="change"
      >
      </el-icon>
      <el-icon
        v-else
        style="font-size: 30px;cursor:pointer;"
        class="element-icons el-icon-zhankaicaidan"
        @click="change"
      >
      </el-icon>
    </div>
    <div class="Etags">
      <Etags></Etags>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  .collapseButton {
    height: 60%;
    display: flex;
    align-items: center;
  }
  .Etags {
    width: 100%;
    height: 40%;
    background-color: pink;
  }
}
</style>