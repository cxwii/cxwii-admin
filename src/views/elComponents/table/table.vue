<script lang="ts" setup>
import { Eltable } from '@/components/ElementPlus/Table'

let tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
]

// 表格列的宽度应该和列数一致,不满的默认就是150
const columnWidth: Array<string> = ['100', '150', '200']

const tset = (a: any, b: any) => {
  console.log('测试a :>> ', a)
  console.log('测试b :>> ', b)
}
</script>

<template>
  <Eltable :data="tableData" :columnWidth="columnWidth" :isColumnButton="true" max-height="250">
    <el-table-column fixed="right" label="Operations" width="250">
      <template #default="scope">
        <el-button type="primary" @click="tset(scope.$index, scope.row)">修改</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </Eltable>
</template>

<style scoped lang="scss"></style>
