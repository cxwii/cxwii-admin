import Editor from './src/Editor.vue'
import { IDomEditor } from '@wangeditor/editor'

// 导出个异步的IDomEditor类型
export interface EditorExpose {
  getEditorRef: () => Promise<IDomEditor>
}

export { Editor }
