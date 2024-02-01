<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(false)

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    @click="drawer = !drawer"
    class="
      fixed
      bottom-1/2
      right-0
      cursor-pointer
      rounded-l-lg
      bg-[#409eff]
      hover:bg-[#258df8]
      hover:w-10
      w-9
      h-9
      flex
      justify-center
      items-center
      transition-all"
  >
    <el-icon size="20" color="#ffffff" class="element-icons el-icon-shezhi" />
  </div>
  <el-drawer v-model="drawer" :title="props.title" :with-header="true">
    <slot></slot>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
