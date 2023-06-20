<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { reactive, onMounted, onBeforeUnmount, ref, unref } from 'vue'
import { getStaticChartOption } from '@/api/Chart'

let option = {
  data: {
  }
} as EChartsOption

let dynamicChartOptions = reactive<EChartsOption>(option) as EChartsOption

const getChartOptionFun = async () => {
  let { data } = await getStaticChartOption({chartName: 'bar'})
  dynamicChartOptions.data = data[0].chartOption
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
  unref(contentEl) &&
    (unref(contentEl) as Element).removeEventListener('transitionend', barEchart.value.resizeHandler)
})
</script>

<template>
  <Echart ref="barEchart" :options="dynamicChartOptions.data as EChartsOption" :height="300"></Echart>
</template>

<style scoped lang="scss">

</style>