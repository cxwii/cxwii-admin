<script lang="ts" setup>
import { reactive } from 'vue'
import { loginApi } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const { push } = useRouter()
const _useUserStore = useUserStore()

type fromType = {
  userName: string,
  password: number
}
class fromData {
  userName = 'admin'
  password = 123456
}

let from: fromType = reactive(new fromData)

const login = async () => {
  const res = await loginApi(from)
  
  if (res.data.status == 200) {
    _useUserStore.setUserInfo('admin')
    push({ path: "/home" })
  } else{
    push({ path: "/index" })
  }
}

const empty = () => {
  Object.assign(from, new fromData())
}

</script>

<template>
 <el-form :model="from" label-width="120px">
    <el-form-item label="userName">
      <el-input v-model="from.userName" />
    </el-form-item>
    <el-form-item label="password">
      <el-input v-model="from.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">login</el-button>
      <el-button @click="empty">empty</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>