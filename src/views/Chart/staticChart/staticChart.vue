<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { onMounted, ref, nextTick } from 'vue'
import { getStaticChartOption } from '@/api/Chart'

let staticChartOptions = ref({})

const getChartOptionFun = async () => {
  let { data } = await getStaticChartOption({ chartName: 'line' })
  staticChartOptions.value = data[0].chartOption
}

onMounted(() => {
  getChartOptionFun()
})


let staemap = ref()
const test = async () => {
  nextTick()
  const rrr = staemap.value.ttt()
  console.log('rrr :>> ', rrr);
  console.log('测试1 :>> ', staemap.value.echartRef)
  console.log('测试2 :>> ', staemap.value.aa)
}
</script>

<template>
  <Echart ref="staemap" :options="staticChartOptions" :height="300" />
  <button @click="test">test</button>
</template>

<style scoped lang="scss"></style>
