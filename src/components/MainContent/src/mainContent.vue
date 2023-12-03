<script lang="ts" setup>
import { ref } from 'vue'
import { ElScrollbar, ElBacktop } from 'element-plus'

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

</script>

<template>
  <div class="myElMainBottomFrame shadow-md rounded-lg bg-[#ffffff] dark:bg-[var(--bg-color)]">
    <ElScrollbar ref="scrollbarRef" wrap-class="scroll-wrap">
      <slot></slot>
      <ElBacktop target=".scroll-wrap" :right="80" :bottom="60" />
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">
.myElMainBottomFrame {
  z-index: -1;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
