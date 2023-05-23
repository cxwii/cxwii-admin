<script lang="ts" setup>
import { reactive } from 'vue'
import { loginApi } from '@/api/Login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useCache } from '@/hook/web/useCache'
import { Eform } from '@/components/ElementPlus/Form'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteRecordRaw } from 'vue-router'
import { LogoSvg } from '@/components/UseSvg'

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
      用getDynamicRouter
      有就使用(并存于本地然后在刷新页面的时候使用)
      没有就使用前端渲染静态默然的
      现在没接口就默认不用了
     */
    if (false) {
      userStore.setDynamicRouter(true)
      getRole()
    } else {
      // 使用一次generateRoutes解决同异步问题导致AddRouters无值问题
      await permissionStore.generateRoutes('none').catch(() => { })
      // 动态添加可访问路由表(这里添加的是前端静态的表)
      permissionStore.getAddRouters.forEach((route) => {
        addRoute(route as RouteRecordRaw)
      })
    }

    push({ path: "/home" })
  } else {
    push({ path: "/index" })
  }
}

const toDocument = () => {
  window.open('https://github.com/cxwii/cxwii-admin')
}

// 在后端渲染时获取角色信息
const getRole = () => {

}

const empty = () => {
  Object.assign(from, new fromData())
}

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
        <div class="text-2xl font-normal">符合直觉的cms解决方案</div>
      </div>
      <div class="formContainer">
        <div class="font-bold mb-10">登录</div>
        <Eform if-button="true" @on-login="login" @on-empty="empty" :model="from" label-position="top">
        </Eform>
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