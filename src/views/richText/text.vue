<script lang="ts" setup>
import { Editor, EditorExpose } from '@/components/Editor';
import { ref, onMounted, unref } from 'vue'
import { IDomEditor } from '@wangeditor/editor'

const editorRef = ref<typeof Editor & EditorExpose>()
const defaultHtml = ref('')

// 内容变化的回调
const change = (editor: IDomEditor) => {
  console.log(editor.getHtml())
}

// 初始化时拿富文本实例
onMounted(async () => {
  const editor = await unref(editorRef)?.getEditorRef()
  console.log(editor)
})

// 模拟后端传文本
setTimeout(() => {
  defaultHtml.value = '<p>hello <strong>world</strong></p>'
}, 3000)
</script>

<template>
  <Editor v-model="defaultHtml" ref="editorRef" @change="change"></Editor>
</template>

<style scoped lang="scss">

</style>