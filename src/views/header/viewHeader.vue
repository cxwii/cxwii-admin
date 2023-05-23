<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { Etags } from '@/components/ElementPlus/Tags';
import { UserInfo } from '@/components/UserInfo';

const isCollapse = inject('isCollapse') as Ref<boolean>

const change = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="header">
    <div class="collapseButton flex">
      <div>
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
      <div class="userInfo rounded-full">
        <UserInfo></UserInfo>
      </div>
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
    border: .8px solid #eee;
    box-shadow: 0.1px 0.2px #d2cbcb;
  }
}
</style>