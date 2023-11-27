<script lang="ts" setup>
import { reactive } from 'vue'
import { Elform } from '@/components/ElementPlus/Form'

type loginFromType = {
  username: string
  password: string
}
class loginFromData {
  username = 'admin'
  password = '123456'
}
let loginFrom: loginFromType = reactive(new loginFromData())
</script>

<template>
  <Elform :model="loginFrom" label-position="top" />
</template>

<style scoped lang="scss"></style>
