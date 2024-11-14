import { ref } from 'vue'
import { Delete, Download, Plus } from '@element-plus/icons-vue'
import { ElUpload, ElIcon, ElDialog } from 'element-plus'
import type { UploadInstance, UploadFile, UploadUserFile } from 'element-plus'
import type { UploadUserFileBase64, optionsType } from '../../types'

export const useRenderOriginal = (
  options: optionsType = {
    base64: false,
    url: import.meta.env.VITE_API_PROXY,
    list: [],
    isPreview: false,
    isDownload: false,
    isDelete: false
  },
  emit: (event: 'listUpdate', ...args: any[]) => void
) => {
  const uploadRef = ref<UploadInstance>() // el组件实例
  const fileList = ref<UploadUserFile[] | UploadUserFileBase64[]>(options.list ? options.list : []) // 文件列表
  const fileListBase64: Nullable<UploadUserFileBase64[]> = options.list ? options.list : [] // base64文件列表

  // 文件变动事件(增加fileListBase64)
  const fileChange = async (uploadFile: UploadFile) => {
    const base64 = await toBase64(uploadFile.raw)
    fileListBase64.push({
      uid: uploadFile.raw!.uid,
      url: `${base64}`
    })

    emit('listUpdate', fileListBase64)
  }

  // 转换成base64工具函数
  const toBase64 = (file: any): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  // 预览
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
  }

  // 下载
  const handleDownload = (file: UploadFile) => {
    const link = document.createElement('a')
    link.href = file.url!
    link.download = file.name || 'Img'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  // 删除
  const handleRemove = (file: UploadFile) => {
    // 删除fileList里的
    uploadRef.value?.handleRemove(file)
    // 删除fileListBase64里的
    const index = fileListBase64.findIndex((item) => item.uid === file.uid)
    if (index !== -1) {
      fileListBase64.splice(index, 1)
    }
  }

  // 渲染Dom
  const renderOriginal = () => {
    return (
      <>
        <ElUpload
          ref={uploadRef}
          action="#"
          list-type="picture-card"
          show-file-list={true}
          auto-upload={false}
          v-model:file-list={fileList.value}
          on-change={fileChange}
          v-slots={{
            file: ({ file }: { file: any }) => (
              <div>
                <img class="el-upload-list__item-thumbnail" src={file.url} alt="" />
                <span class="el-upload-list__item-actions">
                  {/* 放大 */}
                  {options.isPreview && (
                    <span
                      class="el-upload-list__item-preview"
                      onClick={() => handlePictureCardPreview(file)}
                    >
                      <ElIcon>
                        <zoom-in />
                      </ElIcon>
                    </span>
                  )}
                  {/* 下载 */}
                  {options.isDownload && (
                    <span class="el-upload-list__item-delete" onClick={() => handleDownload(file)}>
                      <ElIcon>
                        <Download />
                      </ElIcon>
                    </span>
                  )}
                  {/* 删除 */}
                  {options.isDelete && (
                    <span class="el-upload-list__item-delete" onClick={() => handleRemove(file)}>
                      <ElIcon>
                        <Delete />
                      </ElIcon>
                    </span>
                  )}
                </span>
              </div>
            )
          }}
        >
          <ElIcon>
            <Plus />
          </ElIcon>
        </ElUpload>

        <ElDialog v-model={dialogVisible.value}>
          <img class="w-full" src={dialogImageUrl.value} alt="Preview Image" />
        </ElDialog>
      </>
    )
  }

  return {
    renderOriginal
  }
}
