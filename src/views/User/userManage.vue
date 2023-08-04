<script lang="ts" setup>
// 万恶的业务,痛苦的源泉,我想做开源
import { onMounted, ref, reactive } from 'vue'
import { getUserInfoListApi, deleteUserInfoApi, updateUserInfoList } from '@/api/User'
import { ElMessage } from 'element-plus'
import type { UploadInstance } from 'element-plus'

let tableData = ref<Array<object>>([])

const getUserInfoList = async () => {
  const { data: userInfoListData } = await getUserInfoListApi()
  tableData.value = userInfoListData
}

const dialogTableVisible = ref(false)
const form = reactive({
  userId: '',
  username: '',
  email: '',
  userPic: ''
})
const modifyUserInfo = (scope: any) => {
  form.userId = scope.row.userId
  form.username = scope.row.username
  form.email = scope.row.email
  form.userPic = scope.row.userPic
  dialogTableVisible.value = !dialogTableVisible.value
}
const confirmModification = async () => {
  const { status, message } = await updateUserInfoList(form)
  if (status == '200') {
    getUserInfoList()
    dialogTableVisible.value = !dialogTableVisible.value
  } else {
    ElMessage.error(message)
  }
}
const uploadRef = ref<UploadInstance>()
const useClearFiles = () => {
  uploadRef.value?.clearFiles()
}

const handleChange = (uploadFile: any) => {
  if (beforeAvatarUpload(uploadFile)) {
    getBase64(uploadFile.raw).then((res) => {
      form.userPic = res as string
    })
  } else {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
}

const getBase64 = (file: any) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.readAsDataURL(file)
    reader.onload = function () {
      imgResult = reader.result as string
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
  })
}
const beforeAvatarUpload = (file: any) => {
  const isLt2M = file.size / 1024 / 1024 < 2
  return isLt2M
}

const deleteUserInfo = async (scope: any) => {
  const { status, message } = await deleteUserInfoApi({ userId: scope.row.userId })
  if (status == '200') {
    getUserInfoList()
  } else {
    ElMessage.error(message)
  }
}

onMounted(() => {
  getUserInfoList()
})
</script>

<template>
  <el-table table-layout="fixed" :data="tableData" stripe style="width: 100%" max-height="500">
    <el-table-column fixed prop="username" label="用户名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="userPic" label="头像">
      <template #default="scope">
        <el-image
          lazy
          style="width: 100px; height: 100px"
          :src="scope.row.userPic ? scope.row.userPic : 'null'"
        />
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button type="primary" @click="modifyUserInfo(scope)">修改</el-button>
        <el-button type="danger" @click="deleteUserInfo(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogTableVisible" title="修改" class="pr-12">
    <el-form :model="form">
      <el-form-item label="用户" :label-width="150">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="150">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="头像" :label-width="150">
        <el-upload
          ref="uploadRef"
          accept=".jpg, .png"
          :limit="1"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <el-image
            style="width: 100px; height: 100px"
            @click="useClearFiles"
            :src="form.userPic ? form.userPic : 'null'"
          />
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmModification"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
