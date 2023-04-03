<script lang="ts" setup>
import echart from '@/plugins/echart'
import type { EChartsOption } from 'echarts'
import { PropType, computed, ref, onMounted, unref, onBeforeUnmount, watch } from 'vue'
import ProjectTypes from '@/utils/propTypes'
import { isString } from '@/utils/is'
import { debounce } from 'lodash-es'

// echart的dom实例
const elRef = ref<ElRef>()
// echart的实例
let echartRef: Nullable<echart.ECharts> = null

const props = defineProps({
  // 接受配置
  options: {
    type: Object as PropType<EChartsOption>,
    required: true
  },
  // 接受宽度默认是0
  width: ProjectTypes.oneOfType([Number, String]).def(''),
  // 接受高度默认是500
  height: ProjectTypes.oneOfType([Number, String]).def('500px')
})

const options = props.options

// 动态修改数据
watch(
  () => options,
  (options) => {
    if (echartRef) {
      echartRef?.setOption(unref(options))
    }
  },
  {
    deep: true
  }
)

// 计算额外的styles属性
const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`
  return {
    width,
    height
  }
})

// 初始化echart方法
const initChart = () => {
  if (unref(elRef) && options) {
    echartRef = echart.init(unref(elRef) as HTMLElement)
    echartRef?.setOption(unref(options))
  }
}

// 调整大小
const resizeHandler = debounce(() => {
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

// 页面加载初始化方法和resizeHandler
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeHandler)
})

// 页面销毁时注销resizeHandler
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

defineExpose({
  resizeHandler
})
</script>

<template>
  <!-- class是用来接受额外的css的 -->
  <div id="main" ref="elRef" :class="[$attrs.class]" :style="styles"></div>
</template>

<style scoped lang="scss">

</style>