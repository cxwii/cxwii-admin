<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { Etabs } from '@/components/elementPlus/tabs';

const isCollapse = inject('isCollapse') as Ref<boolean>

const change = () => {
  isCollapse.value = !isCollapse.value
}




let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>

<template>
  <div class="header">
    <div class="collapseButton">
      <el-icon
        v-if="!isCollapse"
        style="font-size: 30px;cursor:pointer;"
        class="element-icons el-icon-shouqicaidan"
        @click="change"
      >
      </el-icon>
      <el-icon
        v-else
        style="font-size: 30px;cursor:pointer;"
        class="element-icons el-icon-zhankaicaidan"
        @click="change"
      >
      </el-icon>
    </div>
    <div class="Etabs">
      <Etabs></Etabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  .collapseButton {
    height: 60%;
    display: flex;
    align-items: center;
  }
  .Etabs {
    width: 100%;
    height: 40%;
    background-color: pink;
  }
}
</style>