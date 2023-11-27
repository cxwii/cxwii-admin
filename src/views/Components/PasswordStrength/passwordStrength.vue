<script lang="ts" setup>
/* 
  对@zxcvbn-ts/core的一个使用参考,实际开发没必要特地使用这种封装方法
  除非是大量使用到密码强度的项目
*/
import { ref } from 'vue'
import { PasswordStrength } from '@/components/PasswordStrength'

const passwordValue = ref('')
</script>

<template>
  <PasswordStrength v-model="passwordValue" />
</template>

<style scoped lang="scss"></style>
