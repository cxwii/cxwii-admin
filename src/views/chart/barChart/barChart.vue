<script lang="ts" setup>
import { echart } from '@/components/echart'
import { EChartsOption } from 'echarts'
import { reactive } from 'vue'

let option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
} as EChartsOption

const barOptions = reactive<EChartsOption>(option) as EChartsOption
</script>

<template>
  <echart :options="barOptions" :height="300"></echart>
</template>

<style scoped lang="scss">

</style>