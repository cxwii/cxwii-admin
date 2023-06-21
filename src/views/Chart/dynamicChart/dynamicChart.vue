<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { reactive, onMounted, onBeforeUnmount, ref, unref, withScopeId } from 'vue'

let option = {
  data: {
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
  }
} as EChartsOption

let dynamicChartOptions = reactive<EChartsOption>(option) as EChartsOption
let ws: any
const getChartOptionFun = async () => {
  ws = new WebSocket('ws://127.0.0.1:9528/')

  ws.onopen = () => {
    ws.send('bar')
  }

  ws.onmessage = ({data}: any) => {
    dynamicChartOptions.data = JSON.parse(data)[0].chartOption
  }
}

/* 
  使用echart组件传出来resizeHandler方法调整大小,
  给会出现变化dom上绑定,变化就触发
  原本是放在echart组件中做这件事的,但我觉得应该给用户来决定
 */
const barEchart = ref()
const contentEl = ref<Element>()
onMounted(() => {
  getChartOptionFun()

  contentEl.value = document.getElementsByClassName(`aside`)[0]
  unref(contentEl) &&
    (unref(contentEl) as Element).addEventListener('transitionend', barEchart.value.resizeHandler)
})
onBeforeUnmount(() => {
  ws.close()

  unref(contentEl) &&
    (unref(contentEl) as Element).removeEventListener('transitionend', barEchart.value.resizeHandler)
})
</script>

<template>
  <Echart ref="barEchart" :options="dynamicChartOptions.data as EChartsOption" :height="300"></Echart>
</template>

<style scoped lang="scss">

</style>