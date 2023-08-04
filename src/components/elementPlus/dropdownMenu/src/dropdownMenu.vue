<script setup lang="ts">
import { dropdownMenuSchema } from '@/types/dropdownMenu'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { PropType, ref, toRefs } from 'vue'
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

const { schema, trigger, tagItem } = toRefs(props)

const emit = defineEmits(['visibleChange'])

const dropdownMenuRef = ref<ComponentRef<typeof ElDropdown>>()

const command = (item: dropdownMenuSchema) => {
  item.command && item.command(item)
}

const visibleChange = (visible: boolean) => {
  emit('visibleChange', visible, tagItem.value)
}

defineExpose({
  dropdownMenuRef,
  tagItem
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

<style scoped lang="scss"></style>
