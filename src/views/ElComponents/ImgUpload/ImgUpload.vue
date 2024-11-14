<script lang="ts" setup>
import { ELImgUpload } from '@/components/ElementPlus/ImgUpload'
import type { optionsType } from '@/components/ElementPlus/ImgUpload'

const options: optionsType = {
  base64: true,
  isPreview: true,
  limit: false
}

const foo = (list: any) => {
  console.log('foo :>> ', list)
}
</script>

<template>
  <ELImgUpload :options="options" @list-update="foo" />
</template>

<style scoped lang="scss"></style>
