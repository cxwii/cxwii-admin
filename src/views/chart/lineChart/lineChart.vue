<script lang="ts" setup>
import { echart } from '@/components/echart'
import { EChartsOption } from 'echarts'
import { reactive, onMounted, onBeforeUnmount, ref, unref } from 'vue'

let option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
} as EChartsOption

const lineOptions = reactive<EChartsOption>(option) as EChartsOption

/* 
  使用echart组件传出来resizeHandler方法调整大小,
  给会出现变化dom上绑定,变化就触发
  原本是放在echart组件中做这件事的,但我觉得应该给用户来决定
 */
const lineEchart = ref()
const contentEl = ref<Element>()
onMounted(() => {
  contentEl.value = document.getElementsByClassName(`aside`)[0]
  unref(contentEl) &&
    (unref(contentEl) as Element).addEventListener('transitionend', lineEchart.value.resizeHandler)
})
onBeforeUnmount(() => {
  unref(contentEl) &&
    (unref(contentEl) as Element).removeEventListener('transitionend', lineEchart.value.resizeHandler)
})
</script>

<template>
  <echart ref="lineEchart" :options="lineOptions" :height="300"></echart>
</template>

<style scoped lang="scss">

</style>