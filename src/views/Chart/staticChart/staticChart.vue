<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { onMounted, ref } from 'vue'
import { getStaticChartOption } from '@/api/Chart'

let staticChartOptions = ref({})

const getChartOptionFun = async () => {
  let { data } = await getStaticChartOption({ chartName: 'line' })
  staticChartOptions.value = data[0].chartOption
}

onMounted(() => {
  getChartOptionFun()
})
</script>

<template>
  <Echart :options="staticChartOptions" :height="300" />
</template>

<style scoped lang="scss"></style>
