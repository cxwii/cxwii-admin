<script lang="ts" setup>
import {
  watch,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  computed,
  PropType,
  nextTick,
  unref
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { ElMessage } from 'element-plus'
import { isNumber } from '@/utils/is'
import ProjectTypes from '@/utils/propTypes'

const props = defineProps({
  // 编辑器id,用于支持多个编辑器
  editorId: ProjectTypes.string.def('wangeEditor-1'),
  height: ProjectTypes.oneOfType([Number, String]).def('400px'),
  editorConfig: {
    type: Object as PropType<IEditorConfig>,
    default: () => undefined
  },
  modelValue: ProjectTypes.string.def('')
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>()
// 文本内容
const valueHtml = ref('')

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueHtml)) return
    valueHtml.value = val
  },
  {
    immediate: true
  }
)

// 监听
watch(
  () => valueHtml.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)

// 编辑器配置
const editorConfig = computed((): IEditorConfig => {
  return Object.assign(
    {
      readOnly: false,
      customAlert: (s: string, t: string) => {
        switch (t) {
          case 'success':
            ElMessage.success(s)
            break
          case 'info':
            ElMessage.info(s)
            break
          case 'warning':
            ElMessage.warning(s)
            break
          case 'error':
            ElMessage.error(s)
            break
          default:
            ElMessage.info(s)
            break
        }
      },
      autoFocus: false,
      scroll: true,
      uploadImgShowBase64: true
    },
    props.editorConfig || {}
  )
})

// 编辑器样式(主要是高度)
const editorStyle = computed(() => {
  return {
    height: isNumber(props.height) ? `${props.height}px` : props.height
  }
})

// 回调函数
const emit = defineEmits(['change', 'update:modelValue'])
// 编辑器创建完毕时的回调函数
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}
// 编辑器内容、选区变化时的回调函数
const handleChange = (editor: IDomEditor) => {
  emit('change', editor)
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = unref(editorRef.value)
  if (editor === null) return

  // 销毁，并移除 editor
  editor?.destroy()
})

// 给外部获取编辑器实例
const getEditorRef = async (): Promise<IDomEditor> => {
  await nextTick()
  return unref(editorRef.value) as IDomEditor
}

defineExpose({
  getEditorRef
})
</script>

<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :editorId="editorId" style="border-bottom: 1px solid #ccc" />
    <!-- 编辑器 -->
    <Editor
      v-model="valueHtml"
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :style="editorStyle"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css"></style>
