<script lang="ts" setup>
import { echart } from '@/components/echart'
import { EChartsOption } from 'echarts'
import { reactive, onMounted, onBeforeUnmount, ref, unref } from 'vue'

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

/* 
使用echart组件传出来resizeHandler方法调整大小,
给会出现变化dom上绑定,变化就触发
原本是放在echart组件中做这件事的,但我觉得应该给用户来决定
 */
const barEchart = ref()
const contentEl = ref<Element>()
onMounted(() => {
  contentEl.value = document.getElementsByClassName(`aside`)[0]
  unref(contentEl) &&
    (unref(contentEl) as Element).addEventListener('transitionend', barEchart.value.resizeHandler)
})
onBeforeUnmount(() => {
  unref(contentEl) &&
    (unref(contentEl) as Element).removeEventListener('transitionend', barEchart.value.resizeHandler)
})
</script>

<template>
  <echart ref="barEchart" :options="barOptions" :height="300"></echart>
</template>

<style scoped lang="scss">

</style>