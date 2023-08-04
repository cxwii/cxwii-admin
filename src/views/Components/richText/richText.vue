<script lang="ts" setup>
import { Editor, EditorExpose } from '@/components/Editor'
import { ref, onMounted } from 'vue'
import { IDomEditor } from '@wangeditor/editor'
import { getRichText, updateRichText } from '@/api/RichText'
import { debounce } from 'lodash-es'

const editorRef = ref<typeof Editor & EditorExpose>()
const defaultHtml = ref('')

// 内容变化的回调
const change = debounce((editor: IDomEditor) => {
  updateRichText({
    EditorText: editor.getHtml()
  })
}, 1000)

// 后端传文本
const getRichTextFun = async () => {
  const { data, status } = await getRichText()

  status == '200' ? (defaultHtml.value = data.EditorText) : (defaultHtml.value = '')
}

onMounted(async () => {
  getRichTextFun()
  // 富文本实例
  // const editor = await unref(editorRef)?.getEditorRef()
})
</script>

<template>
  <Editor v-model="defaultHtml" ref="editorRef" @change="change" />
</template>

<style scoped lang="scss"></style>
