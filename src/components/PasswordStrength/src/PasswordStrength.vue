<script lang="ts" setup>
import { ref, unref, computed, watch, toRefs } from 'vue'
import { ElInput } from 'element-plus'
import ProjectTypes from '@/utils/propTypes'
import { zxcvbn } from '@zxcvbn-ts/core'
import type { ZxcvbnResult } from '@zxcvbn-ts/core'

const props = defineProps({
  modelValue: ProjectTypes.string.def('')
})

const emit = defineEmits(['update:modelValue'])

// 输入框的值
const { modelValue } = toRefs(props)
const valueRef = ref(modelValue.value)

// valueRef和modelValue之间的相互更新,解决多个input的同步更新问题
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

// 获取密码强度
const getPasswordStrength = computed(() => {
  const value = unref(valueRef)
  const zxcvbnRef = zxcvbn(unref(valueRef)) as ZxcvbnResult
  return value ? zxcvbnRef.score : -1
})
</script>

<template>
  <ElInput v-model="valueRef" show-password />
  <div class="passwordStrength relative h-1.5 mt-2.5 mb-1.5 mr-auto ml-auto">
    <div class="passwordStrengthBlock" :data-score="getPasswordStrength"></div>
  </div>
</template>

<style scoped lang="scss">
.passwordStrength {
  background-color: #c0c4cc;
  border-radius: 4px;

  &::before,
  &::after {
    position: absolute;
    z-index: 1;
    display: block;
    width: 20%;
    height: inherit;
    background-color: transparent;
    border-color: #ffffff;
    border-style: solid;
    border-width: 0 5px 0 5px;
    content: '';
  }

  &::before {
    left: 20%;
  }

  &::after {
    right: 20%;
  }

  .passwordStrengthBlock {
    position: absolute;
    width: 0;
    height: inherit;
    background-color: transparent;
    border-radius: inherit;
    transition:
      width 0.5s ease-in-out,
      background 0.25s;

    &[data-score='0'] {
      width: 20%;
      background-color: #f56c6c;
    }

    &[data-score='1'] {
      width: 40%;
      background-color: #f56c6c;
    }

    &[data-score='2'] {
      width: 60%;
      background-color: #e6a23c;
    }

    &[data-score='3'] {
      width: 80%;
      background-color: #67c23a;
    }

    &[data-score='4'] {
      width: 100%;
      background-color: #67c23a;
    }
  }
}
</style>
