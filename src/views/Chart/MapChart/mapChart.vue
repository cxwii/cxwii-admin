<script lang="ts" setup>
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { ref, reactive, nextTick, onMounted } from 'vue'
import { getProvinceMapInfo, getProvinceJson } from '@/utils/mapUtil'
import chinaMapData from '@_public/static/map/china.json'
import { ElButton } from 'element-plus'
// 这个新版的数据(使用需要更改mapUtil里面的中文转译)
// import chinaMapData from "@_public/static/map/newChina.json"

// mapChart实例
const mapChartRef = ref()
// 获取echartRef(map的实例)
let echartRef: any
// mapChart配置
let mapChartOptions = ref<EChartsOption>({})

// 省份缓存
type User = {
  name: string
  value: number[]
}
type UserData = {
  children: User
  name: string
}
const content = reactive({
  allData: [] as UserData[],
  titleFontSize: 0,
  mapCache: new Map<string, any>() //缓存以获取的地图数据
})

// 初始化
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
        borderColor: '#333333'
      }
    },
    legend: {
      left: '5%',
      bottom: '5%',
      orient: 'vertical' //垂直排列
    }
  }
  // 获取echartRef(map的实例)
  echartRef = mapChartRef.value.getEchartRef()
  // 省份的钻入事件
  echartRef.on('click', async (arg: any) => {
    // arg.name 得到点击的省份名称是中文的，json存储的是英文，需要转译
    const privinceInfo = getProvinceMapInfo(arg.name)
    // 解决双击时触发和无下级信息的报错
    if (!privinceInfo.key) return
    // 判断缓存中是否存在
    const mapData = content.mapCache.get(privinceInfo.key)
    if (mapData) {
      registerMap(privinceInfo.key, mapData)
    } else {
      let data: any = await getProvinceJson(privinceInfo.path)
      // 缓存一份
      content.mapCache.set(privinceInfo.key, data.default)
      registerMap(privinceInfo.key, data.default)
    }
  })
}

// 绘制省份方法
const registerMap = (key: string, data: any) => {
  mapChartRef.value.echart.registerMap(key, data)
  const changeOption = {
    geo: {
      map: key
    }
  }
  echartRef.setOption(changeOption)
}

// 返回大地图方法
const revertMap = () => {
  const option = {
    geo: {
      map: 'china'
    }
  }
  echartRef.setOption(option)
}

onMounted(() => {
  initMapchart()
})
</script>

<template>
  <Echart ref="mapChartRef" :options="mapChartOptions as EChartsOption" />
  <ElButton @click="revertMap">返回</ElButton>
</template>

<style scoped lang="scss"></style>
