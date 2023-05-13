<script lang="ts" setup>
import { dropdownMenuSchema } from '@/types/dropdownMenu';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { PropType, ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const props = defineProps({
  schema: {
    type: Array as PropType<dropdownMenuSchema[]>,
    default: () => []
  },
  trigger: {
    type: String as PropType<'click' | 'hover' | 'focus' | 'contextmenu'>,
    default: 'contextmenu'
  },
  tagItem: {
    type: Object as PropType<RouteLocationNormalizedLoaded>,
    default: () => ({})
  }
})

// 节流函数


const emit = defineEmits(['visibleChange'])

const dropdownMenuRef = ref<ComponentRef<typeof ElDropdown>>()

const command = (item: dropdownMenuSchema) => {
  // 拿到item执行里面的command,有嵌套就再递归调用
  item.command && item.command(item)
}

const visibleChange = (visible: boolean) => {
  emit('visibleChange', visible, props.tagItem)
}

defineExpose({
  dropdownMenuRef,
  tagItem: props.tagItem
})
</script>

<template>
  <ElDropdown
    ref="dropdownMenuRef"
    :trigger="trigger"
    @command="command"
    @visible-change="visibleChange"
    placement="bottom-start"
  >
    <slot></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in schema"
          :key="`dropdown${index}`"
          :divided="item.divided"
          :disabled="item.disabled"
          :command="item"
        >
          {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped lang="scss">
</style>