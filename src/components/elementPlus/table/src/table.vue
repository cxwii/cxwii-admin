<script setup lang="tsx">
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { PropType, useSlots, useAttrs, unref } from 'vue'

interface TableProps {
  tableData: Array<object>
  columnWidth: Array<string>
  isColumnButton: boolean
}

const props = defineProps({
  data: {
    type: Object as PropType<TableProps['tableData']>,
    required: true
  },
  columnWidth: {
    type: Object as PropType<TableProps['columnWidth']>
  },
  isColumnButton: {
    type: Boolean as PropType<TableProps['isColumnButton']>,
    default: false
  }
})

const slots = useSlots()
const attrs = useAttrs()

const useRendertable = () => {
  return <>{useRenderColumn()}</>
}

const useRenderColumn = () => {
  let ColumnTemplate: Array<JSX.Element> = []
  Object.keys(props.data[0]).forEach((item, index) => {
    // props.columnWidth永远都存在但可能没值
    // 默认宽度150
    ColumnTemplate.push(
      <ElTableColumn
        prop={item}
        label={item}
        width={props.columnWidth![index] ? props.columnWidth![index] : '150'}
      />
    )
  })

  if (props.isColumnButton) {
    let columnButton: unknown = slots.default!()
    ColumnTemplate.push(columnButton as JSX.Element)
  }

  return ColumnTemplate
}

const app = () => {
  return (
    <ElTable data={props.data} {...attrs}>
      {slots.default && !props.isColumnButton ? slots.default() : useRendertable()}
    </ElTable>
  )
}
</script>

<template>
  <app />
</template>

<style scoped lang="scss"></style>
