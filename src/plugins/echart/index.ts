import * as echarts from 'echarts/core'

// 图表
// 使用了什么新图表请按需引入对应的内容,就下面这里引入,然后在echarts.use这里按需注册
import { BarChart, LineChart, MapChart, PieChart } from 'echarts/charts'

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
  MapChart,
  PieChart
])

export default echarts
