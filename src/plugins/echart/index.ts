import * as echarts from 'echarts/core'

/* 
使用了什么新图表请按需引入对应的内容
*/

// 图表
import { BarChart, LineChart, MapChart } from 'echarts/charts'

// 内置的组件
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  MapChart
])

export default echarts
