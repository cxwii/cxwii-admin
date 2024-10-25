<script lang="tsx" setup>
import { PropType, toRaw, toRefs } from 'vue'
import type { optionsType } from '../types'
import { useRenderBase64 } from './components/useRenderBase64'

const props = defineProps({
  options: {
    type: Object as PropType<optionsType>,
    required: true
  }
})
const { options } = toRefs(props)

const { renderBase64 } = useRenderBase64(options.value)
</script>

<template>
  <component :is="renderBase64()" />
</template>
