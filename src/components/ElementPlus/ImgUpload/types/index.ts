export interface UploadUserFileBase64 {
  uid: number
  url: string
}

/**
 * @param base64 - 是否开启上传base64模式,默认不开启(开启后具体的上传逻辑通过@list-update回调来自定义)
 * @param url - 是否自定义上传地址,默认是会用import.meta.env.VITE_API_PROXY
 * @param list - 回调用的初始数组
 * @param isPreview - 是否开启预览功能
 * @param isDownload - 是否开启下载功能
 * @param isDelete - 是否开启删除功能
 */
export interface optionsType {
  base64?: boolean
  url?: string
  list?: any[]
  isPreview?: boolean
  isDownload?: boolean
  isDelete?: boolean
}
