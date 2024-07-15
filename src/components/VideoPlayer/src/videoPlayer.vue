<script lang="ts" setup>
import { unref, ref, onMounted, PropType, onBeforeUnmount, watch, nextTick } from 'vue'
import Player, { IPlayerOptions } from 'xgplayer'
import 'xgplayer/dist/index.min.css'

export interface Options extends IPlayerOptions {
  url: string | undefined
  id?: never
  el?: never
}

const props = defineProps({
  options: {
    type: Object as PropType<Options>,
    required: true
  }
})

// 播放器实例
const playerRef = ref<Player | null>()
// 播放器DOM
const xgVideoEl = ref<HTMLDivElement>()

const intiPlayer = () => {
  if (!unref(xgVideoEl)) return
  // 用Object.assign把el属性覆盖一下,免得有人看到never还传值,id不用,传了也不会生效
  playerRef.value = new Player(Object.assign({ ...unref(props.options) }, { el: unref(xgVideoEl) }))
}

watch(
  () => props,
  async (newProps) => {
    // 确保什么时机下更改options时dom都创建完了
    await nextTick()
    if (newProps) {
      // unref(playerRef)?.setConfig(
      //   Object.assign({ ...unref(newProps.options) }, { el: unref(xgVideoEl) })
      // )
      // 直接根据新配置创建新的playerRef,上面的setConfig好像不能做dom的刷新,配置生效但不刷新
      intiPlayer()
    }
  },
  {
    deep: true
  }
)

onMounted(() => {
  intiPlayer()
})

onBeforeUnmount(() => {
  playerRef.value?.destroy()
  playerRef.value = null
})

defineExpose({
  // 给外部拿播放器实例
  playerExpose: () => unref(playerRef)
})
</script>

<template>
  <div id="xgVideoEl" ref="xgVideoEl"></div>
</template>

<style scoped lang="scss"></style>
