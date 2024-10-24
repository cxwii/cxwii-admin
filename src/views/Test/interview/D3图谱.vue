<script lang="ts" setup>
import * as d3 from 'd3'
import { onMounted } from 'vue'

// 数据
const data = {
  name: '总公司',
  meta: '总关系',
  radius: 80,
  arrow: 35,
  children: [
    {
      name: '子公司1',
      meta: '关系1',
      radius: 50,
      arrow: 25,
      children: [
        {
          name: '子公司1-1',
          meta: '关系1-1',
          radius: 50,
          arrow: 25
        },
        {
          name: '子公司1-2',
          meta: '关系1-2',
          radius: 50,
          arrow: 25
        }
      ]
    },
    {
      name: '子公司2',
      meta: '关系2',
      radius: 50,
      arrow: 25,
      children: [
        {
          name: '子公司2-1',
          meta: '关系2-1',
          radius: 50,
          arrow: 25
        },
        {
          name: '子公司2-2',
          meta: '关系2-2',
          radius: 50,
          arrow: 25
        },
        {
          name: '子公司2-3',
          meta: '关系2-3',
          radius: 50,
          arrow: 25
        }
      ]
    }
  ]
}

//拖拽功能
const drag = (simulation: any) => {
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: any, d: any) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
}

const D3Init = () => {
  const height = 900
  const width = 1400
  const root = d3.hierarchy(data)
  const links = root.links()
  const nodes = root.descendants()

  const simulation = d3
    .forceSimulation(nodes as any)
    .force(
      'link',
      d3
        .forceLink(links as any)
        .id((d: any) => d.id)
        //设置距离
        .distance(300)
        //设置聚合，越小越分散
        .strength(0.5)
    )
    //设置边距
    //设置超出拉扯距离，越小越不会超出画布
    .force('charge', d3.forceManyBody().strength(-3000))
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  //指定容器
  const svg = d3
    .select('.container')
    .append('svg')
    //设置展示到画板中间
    .attr('viewBox', [-width / 2, -height / 2, width, height])

  const arrow = svg
    .append('defs')
    .append('marker')
    .data(nodes)
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', (d) => {
      console.log('d箭头 :>> ', d)
      return d.data.arrow
    })
    .attr('refY', 0)
    .attr('markerWidth', 20)
    .attr('markerHeight', 20)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#999')

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('marker-end', 'url(#arrow)')

  const node1 = svg
    .append('g')
    .attr('fill', '#efea0e')
    .attr('stroke', '#efea0e')
    .attr('stroke-width', 1)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    //给圆设置背景色
    .attr('fill', (d) => {
      if (d.depth === 0) return 'red'
      else if (d.children) return 'yellow'
      else return 'blue'
    })
    .attr('stroke', (d) => {
      if (d.depth === 0) return 'red'
      else if (d.children) return 'yellow'
      else return 'blue'
    })
    //指定圆的半径
    .attr('r', (d) => {
      console.log('半径数据 :>> ', d)
      return d.data.radius
    })
    //应用拖拽
    .call(drag(simulation) as any)

  const node = svg
    .append('g')
    .attr('class', 'my-class')
    .selectAll('.my-class')
    .data(nodes)
    .join('text')
    //可以直接设置style属性，试了很多属性不起作用，除了font-size和fill属性，暂时还没找到原因？？
    .attr('style', 'font-family: arial; ;')
    //设置两个text会被覆盖
    .text((d) => {
      return d.data.name
    })
    //应用拖拽
    .call(drag(simulation) as any)

  const linkText = svg
    .append('g')
    .selectAll('text')
    .data(links)
    .join('text')
    .text((d) => {
      console.log('d数据 :>> ', d)
      return d.source.data.meta
    })
    .attr('text-anchor', 'middle')
    .attr('dy', 4)
    .attr('font-size', '18px')
    .attr('fill', 'black')

  simulation.on('tick', () => {
    let x1 = 10
    let x2 = 10
    let y1 = 10
    let y2 = 10

    link
      .attr('x1', (d: any) => {
        x1 = d.source.x
        return x1
      })
      .attr('y1', (d: any) => {
        y1 = d.source.y
        return y1
      })
      .attr('x2', (d: any) => {
        x2 = d.target.x
        return x2
      })
      .attr('y2', (d: any) => {
        y2 = d.target.y
        return y2
      })

    linkText
      .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
      .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

    //设置坐标进行定位
    node
      .attr('x', (d: any) => {
        return d.x
      })
      .attr('y', (d: any) => {
        return d.y
      })
    //画圆的时候需要用到的，指定cx和cy
    node1.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
  })

  return svg.node()
}

onMounted(() => {
  D3Init()
})
</script>

<template>
  <div class="container"></div>
</template>

<style scoped lang="scss">
.classA {
  display: block;
  padding: 2px;
  background-color: aquamarine;
}
.style-text {
  display: block;
  padding: 2px;
  background-color: aquamarine;
}
</style>
