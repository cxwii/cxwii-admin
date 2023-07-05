<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { loginApi, getRouterApi, registerApi } from '@/api/User'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useCache } from '@/hooks/web/useCache'
import { Elform } from '@/components/ElementPlus/Form'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteRecordRaw } from 'vue-router'
import { LogoSvg } from '@/components/UseSvg'
import { ElMessage } from 'element-plus'

const { push, addRoute } = useRouter()
const { wsCache } = useCache()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

type loginFromType = {
  username: string,
  password: string
}
class loginFromData {
  username = 'admin'
  password = '123456'
}
let loginFrom: loginFromType = reactive(new loginFromData)

type registerFromType = {
  username: string,
  password: string,
  confirmPassword: string
}
class registerFromData {
  username = ''
  password = ''
  confirmPassword = ''
}
let registerFrom: registerFromType = reactive(new registerFromData)

const toDocument = () => {
  window.open('https://github.com/cxwii/cxwii-admin')
}

// 登录
const login = async () => {
  const res = await loginApi(loginFrom)
  if (res.status == 200) {
    // 存储用户数据
    userStore.setUsername(res.data.username)
    userStore.setToken(res.token)
    userStore.setUserPic(res.data.userPic)
    wsCache.set('token', userStore.getToken)

    // 根据用户信息有没有额外的权限路由,1是管理有,其他没有(表里面默认2)
    if (res.data.roleId === '1') {
      userStore.setDynamicRouter(true)
    } else {
      userStore.setDynamicRouter(false)
    }

    // 用前端路由
    userStore.setDynamicRouter(false)

    if (userStore.getDynamicRouter) {
      getRole()
    } else {
      // 使用一次generateRoutes解决同异步问题导致AddRouters无值问题
      await permissionStore.generateRoutes('none').catch(() => {})
      // 动态添加可访问路由表(这里添加的是前端静态的表)
      permissionStore.getAddRouters.forEach((route: any) => {
        addRoute(route as RouteRecordRaw)
      })
      permissionStore.setIsAddRouters(true)
      push({ path: "/home" })
    }
  } else {
    push({ path: "/login" })
  }
}

// 在后端渲染时获取角色信息
const getRole = async () => {
  const res = await getRouterApi()
  if (res.status == 200) {
    wsCache.set('roleRouters', res.data)
    await permissionStore.generateRoutes('admin', res.data).catch(() => {})
    permissionStore.getAddRouters.forEach((route: any) => {
      addRoute(route as RouteRecordRaw)
    })
    permissionStore.setIsAddRouters(true)
    push({ path: "/home" })
  }
}

let isRegister = ref<boolean>(false)
const register = () => {
  isRegister.value = !isRegister.value
}


// 注册的方法
const toRegister = async () => {
  if (registerFrom.password === registerFrom.confirmPassword) {
    const res = await registerApi({
      username: registerFrom.username,
      password: registerFrom.password
    })

    if (res.status == 200) {
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
      returnLogin()
    }
  } else {
    ElMessage({
      message: '密码不一致',
      type: 'warning'
    })
  }
}

const returnLogin = () => {
  isRegister.value = !isRegister.value
}

// 重置登录的初始值,现在用不到
// const empty = () => {
//   Object.assign(from, new fromData())
// }

</script>

<template>
  <div class="index">
    <img src="@/assets/imgs/loginBg.jpg" class="loginBg" alt="">
    <div class="loginLogo cursor-pointer flex flex-row" @click="toDocument">
      <LogoSvg name="vuex-store" class="h-full w-full"></LogoSvg>
    </div>
    <div @click="toDocument" class="loginText cursor-pointer flex items-center text-white text-xl font-bold">
      cxwii-Admin
    </div>
    <div class="loginPage flex">
      <div class="introduce max-[1100px]:hidden flex flex-col justify-center items-center text-3xl font-medium text-white">
        <div class="mb-5">欢迎使用本系统</div>
        <div class="text-2xl font-normal">一款开箱即用,</div>
        <div class="text-2xl font-normal">符合直觉的cms但不限于cms的解决方案</div>
      </div>
      <div class="formContainer">
        <Elform
          v-if="!isRegister"
          :is-button=true
          :is-Register=isRegister
          @onLogin="login"
          @onRegister="register"
          :model="loginFrom"
          label-position="top"
        >
        </Elform>
        <Elform
          v-else
          :is-button=true
          :is-Register=isRegister
          @onToRegister="toRegister"
          @onReturnLogin="returnLogin"
          :model="registerFrom"
          label-position="top"
        >
        </Elform>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginLogo {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 70px;
    height: 70px;
  }
  .loginText {
    position: absolute;
    left: 90px;
    top: 20px;
    height: 70px;
  }
  .loginBg {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: -1;
  }
  .loginPage {
    .introduce {
      width: 500px;
    }
    .formContainer {
      width: 500px;
      height: 500px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 40px;
      border-radius: 10px;
      margin-left: 50px;
    }
  }
}
</style>