/**
 * @param uid - id
 * @param url - string形式的图片地址,base64或网络地址都可以
 */
export interface UploadUserFileBase64 {
  uid: number
  url: string
}

/**
 * @param base64 - 是否开启上传base64模式,默认不开启(开启后具体的上传逻辑通过@list-update回调来自定义)
 * @param url - 是否自定义上传地址,默认是会用import.meta.env.VITE_API_PROXY(base64模式下无用,因为要自定义上传逻辑)
 * @param list - 回调用的初始数组
 * @param tip - 底下的红色提示文字(默认无)
 * @param limit - 限制上传数量(默认3张,值为false或不传则为不限制)
 * @param size - 限制上传大小(默认2M,单位M,值为false或不传则为不限制)
 * @param isPreview - 是否开启预览功能
 * @param isDownload - 是否开启下载功能
 * @param isDelete - 是否开启删除功能
 */
export interface optionsType {
  base64?: boolean
  url?: string
  list?: UploadUserFileBase64[]
  tip?: string | boolean
  limit?: number | boolean
  size?: number | boolean
  isPreview?: boolean
  isDownload?: boolean
  isDelete?: boolean
}
