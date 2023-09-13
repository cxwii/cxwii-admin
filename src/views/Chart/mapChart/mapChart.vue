<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { ref, nextTick, onMounted } from 'vue'
// import chinaMapData from '@/../public/static/map/china.json'
// 这个新版的数据
import chinaMapData from '@/../public/static/map/newChina.json'

// mapChart实例
const mapChartRef = ref()
// mapChart配置
let mapChartOptions = ref<EChartsOption>({})

const initMapchart = async () => {
  // 一定要先注册地图的json数据才能注入配置
  mapChartRef.value.echart.registerMap('china', chinaMapData)
  mapChartOptions.value = {
    geo: {
      type: 'map',
      map: 'china',
      top: '5%',
      bottom: '5%',
      itemStyle: {
        // 每个省份的颜色
        areaColor: '#2e72bf',
        borderColor: '#333333',
      },
    },
    legend: {
      left: '5%',
      bottom: '5%',
      orient: 'vertical', //垂直排列
    }
  }
  // 获取echartRef(map的实例)
  const mapEchartRef = mapChartRef.value.getEchartRef()
  // 省份的钻入事件
  mapEchartRef.on('click', (arg: any) => {
    console.log('点击 :>> ', arg)
  })
}

onMounted(() => {
  initMapchart()
})
</script>

<template>
  <Echart ref="mapChartRef" :options="mapChartOptions as EChartsOption" />
</template>

<style scoped lang="scss"></style>
