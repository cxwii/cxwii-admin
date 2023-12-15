<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElScrollbar, ElBacktop } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const pageLoading = computed(() => userStore.getPageLoading)

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

</script>

<template>
  <div :v-loading="pageLoading" class="myElMainBottomFrame
    shadow-md
    rounded-lg
    bg-[#ffffff]
    dark:bg-[var(--bg-color)]">
    <ElScrollbar ref="scrollbarRef" wrap-class="scroll-wrap">
      <!-- <Transition
        type="animation"
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceOutLeft"
      >
        <slot></slot>
      </Transition> -->
        <slot></slot>
      <ElBacktop target=".scroll-wrap" :right="80" :bottom="60" />
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">
.myElMainBottomFrame {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
