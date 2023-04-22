<script lang="ts" setup>
import { reactive } from 'vue'
import { loginApi } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useCache } from '@/hook/web/useCache'
import { Eform } from '@/components/elementPlus/form'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteRecordRaw } from 'vue-router'

const { push, addRoute } = useRouter()
const { wsCache } = useCache()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

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
    // 存储用户数据
    userStore.setUserInfo('admin')
    wsCache.set('user', 'admin')

    // 使用一次generateRoutes解决同异步问题导致AddRouters无值问题
    await permissionStore.generateRoutes('none').catch(() => {})

    permissionStore.getAddRouters.forEach((route) => {
      // 动态添加可访问路由表
      addRoute(route as RouteRecordRaw)
    })

    push({ path: "/home" })
  } else{
    push({ path: "/index" })
  }
  
  // 直接给他过,开api太麻烦了
  // wsCache.set('user', 'admin')
  // push({ path: "/home" })

}

const empty = () => {
  Object.assign(from, new fromData())
}

</script>

<template>
  <div class="formContainer">
    <Eform
      if-button="true"
      @on-login="login"
      @on-empty="empty"
      :model="from"
      label-position="top"
    >
    </Eform>
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