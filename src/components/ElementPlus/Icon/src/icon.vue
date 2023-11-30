<script setup lang="ts">
import { toRefs } from 'vue'
import { ElIcon } from 'element-plus'
import ProjectTypes from '@/utils/propTypes'

const props = defineProps({
  icon: ProjectTypes.string,
})

const { icon } = toRefs(props)
</script>

<template>
  <ElIcon :class="icon">
  </ElIcon>
</template>

<style lang="less" scoped></style>