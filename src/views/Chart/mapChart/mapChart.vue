<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { onMounted, ref } from 'vue'

import chinaMapData from '@/assets/map/chinaMap.json'

let mapChartOptions = ref({
  geo: {
    type:'map',
    map:'chinaMap'
  }
})
const mapEchart = ref()

const getChartOptionFun = async () => {
  mapEchart.value.registerMap('chinaMap', chinaMapData)
}

onMounted(() => {
  getChartOptionFun()
})
</script>

<template>
  <Echart ref="mapEchart" :options="mapChartOptions as EChartsOption" :height="300" />
</template>

<style scoped lang="scss"></style>
