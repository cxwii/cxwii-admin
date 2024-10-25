<script lang="ts" setup>
import { ELImgUpload } from '@/components/ElementPlus/ImgUpload'
import type { optionsType } from '@/components/ElementPlus/ImgUpload'

const options: optionsType = {
  isPreview: true // 是否预览
  // isDownload: true, // 是否下载
  // isDelete: true // 是否删除
}
</script>

<template>
  <ELImgUpload :options="options" />
</template>

<style scoped lang="scss"></style>
