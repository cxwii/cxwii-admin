<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { reactive, onMounted, onBeforeUnmount, ref, unref } from 'vue'
import { useSocket, Options, Socket } from '@/hooks/web/useWebSocket'

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

const socket = ref<Socket>()
const getChartOptionFun = async () => {
  // ws的配置
  const options: Options = {
    url: '127.0.0.1:9528'
  }
  // 实例ws
  socket.value = useSocket(options)
  // 订阅事件
  socket.value.subscribe('open', () => {
    socket.value?.sendMessage('bar')
  })
  socket.value.subscribe('message', (result: any) => {
    dynamicChartOptions.data = result[0].chartOption
  })
}

// const barEchart = ref()
// const contentEl = ref<Element>()
onMounted(() => {
  getChartOptionFun()

  // contentEl.value = document.getElementsByClassName(`aside`)[0]
  // unref(contentEl) &&
  //   (unref(contentEl) as Element).addEventListener('transitionend', barEchart.value.resizeHandler)
})
onBeforeUnmount(() => {
  // 关闭ws
  socket.value?.closeSocket()

  // unref(contentEl) &&
  //   (unref(contentEl) as Element).removeEventListener(
  //     'transitionend',
  //     barEchart.value.resizeHandler
  //   )
})
</script>

<template>
  <Echart :options="dynamicChartOptions.data as EChartsOption" :height="300" />
</template>

<style scoped lang="scss"></style>
