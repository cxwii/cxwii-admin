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

// 登录
const login = async () => {
  const res = await loginApi(from)
  if (res.data.status == 200) {    
    // 存储用户数据(现在就简单存个字段)
    userStore.setUserInfo('admin')
    wsCache.set('user', 'admin')

    /* 
      这里应该是根据用户信息有没有额外的权限路由
      有就使用(并存于本地然后在刷新页面的时候使用)
      没有就使用前端渲染静态默然的
      现在没接口就默认不用了
     */
    if (false) {
      userStore.setDynamicRouter(true)
      getRole()
    } else {
      // 使用一次generateRoutes解决同异步问题导致AddRouters无值问题
      await permissionStore.generateRoutes('none').catch(() => {})
      // 动态添加可访问路由表(这里添加的是前端静态的表)
      permissionStore.getAddRouters.forEach((route) => {
        addRoute(route as RouteRecordRaw)
      })
    }

    push({ path: "/home" })
  } else{
    push({ path: "/index" })
  }
  
  // 直接给他过,开api太麻烦了
  // wsCache.set('user', 'admin')
  // push({ path: "/home" })

}

// 在后端渲染时获取角色信息
const getRole = () => {

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