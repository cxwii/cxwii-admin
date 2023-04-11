<script setup lang="tsx">
import { ElTable, ElTableColumn } from 'element-plus'
import { PropType, useSlots, useAttrs, computed, unref } from 'vue'

interface TableProps {
  tableData: Array<object>
}

const props = defineProps({
  data: {
    type: Object as PropType<TableProps['tableData']>,
    required: true
  }
})

const slots = useSlots()
const attrs = useAttrs()

const fixedHead = computed(() => {
  console.log('object :>> ', slots.default);
  return slots.default ? undefined : "250"
})

const tableTemplate = () => {
  return (
    <>
      <ElTableColumn fixed prop="date" label="Date" width="150" />
      <ElTableColumn prop="name" label="Name" width="120" />
      <ElTableColumn prop="state" label="State" width="120" />
      <ElTableColumn prop="city" label="City" width="320" />
      <ElTableColumn prop="address" label="Address" width="600" />
      <ElTableColumn prop="zip" label="Zip" width="120" />
    </>
  )
}

const app = () => {
  return (
    <ElTable
      data={props.data}
      {...attrs}
      height={unref(fixedHead)}
    >
      {
        slots.default ? slots.default() : tableTemplate()
      }
    </ElTable>
  )
}
</script>

<template>
 <app></app>
</template>

<style scoped lang="scss">

</style>