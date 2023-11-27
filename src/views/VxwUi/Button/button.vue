<script lang="ts" setup>
const clickButton = () => {
  console.log('点击事件')
}
</script>

<template>
  <vxw-button type="primary" @click="clickButton">按钮</vxw-button>
  <vxw-button type="success" round>成功</vxw-button>
  <vxw-button type="danger" disabled>失败</vxw-button>
  <vxw-button type="primary" circle="anniu" />
  <vxw-button type="success" circle="gongneng_chenggong" />
  <vxw-button type="danger" circle="shanchu" disabled />
  <div>按钮组</div>
  <vxw-button-group>
    <vxw-button type="success">成功</vxw-button>
    <vxw-button type="danger" disabled>失败</vxw-button>
  </vxw-button-group>
</template>

<style scoped lang="scss"></style>
