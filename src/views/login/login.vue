<script lang="ts" setup>
import { reactive } from 'vue'
import { loginApi } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useCache } from '@/hook/web/useCache'
import ElForm from '@/components/form/src/form.vue'

const { push } = useRouter()
const { wsCache } = useCache()
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
    wsCache.set('user', 'admin')
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
  <div class="formContainer">
    <ElForm
      if-button="true"
      @on-login="login"
      @on-empty="empty"
      :model="from"
      label-position="top">
    </ElForm>
  </div>
</template>

<style scoped lang="scss">
.formContainer {
  width: 500px;
  background-color: rgba(93, 181, 233, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
}
</style>