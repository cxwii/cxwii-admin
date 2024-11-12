<script lang="tsx" setup>
import { PropType, toRefs } from 'vue'
import type { optionsType } from '../types'
import { useRenderBase64 } from './components/useRenderBase64'
import { useRenderOriginal } from './components/useRenderOriginal'

const props = defineProps({
  options: {
    type: Object as PropType<optionsType>,
    required: true
  }
})
const { options } = toRefs(props)

const emit = defineEmits(['listUpdate'])

const render = () => {
  if (options.value.base64) {
    const { renderBase64 } = useRenderBase64(options.value, emit)
    return renderBase64
  } else {
    const { renderOriginal } = useRenderOriginal(options.value, emit)
    return renderOriginal
  }
}
</script>

<template>
  <component :is="render()" />
</template>
