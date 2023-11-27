<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { loginApi, getRdRouterApi, getCodeRouterApi, registerApi } from '@/api/User'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useCache } from '@/hooks/web/useCache'
import { Elform } from '@/components/ElementPlus/Form'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteRecordRaw } from 'vue-router'
import { UseSvg } from '@/components/UseSvg'
import { ElMessage } from 'element-plus'
import { ElLocaleDropdown } from '@/components/ElementPlus/LocaleDropdown'
import { useI18n } from '@/hooks/web/useI18n'
import { string } from 'vue-types'

const { t } = useI18n()
const { push, addRoute } = useRouter()
const { wsCache } = useCache()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

type loginFromType = {
  username: string
  password: string
}
class loginFromData {
  username = 'admin'
  password = '123456'
}
let loginFrom: loginFromType = reactive(new loginFromData())

type registerFromType = {
  username: string
  password: string
  confirmPassword: string
}
class registerFromData {
  username = ''
  password = ''
  confirmPassword = ''
}
let registerFrom: registerFromType = reactive(new registerFromData())

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

    // 根据的权限路由,1是息管理有,其他没用户信有没有额外有(表里面默认2)
    // 要根据后端方案,我这里就懒得再重写一个后端了就凑活用了
    if (res.data.roleId === '1') {
      userStore.setDynamicRouter(true)
    } else {
      userStore.setDynamicRouter(false)
    }

    // 有东西没搞完先写死用前端路由
    /*
    路由想做两个方案
    一个由后端动态插入(已完成)
    一个权限字段前端过滤(已完成,但还想优化一下)
    */
    userStore.setDynamicRouter(false)

    if (userStore.getDynamicRouter) {
      getRole()
    } else {
      // 使用一次generateRoutes解决同异步问题导致AddRouters无值问题
      // catch错误了不影响执行,增强兼容性
      await permissionStore.generateRoutes('noneRouter').catch(() => {})
      // 动态添加可访问路由表(这里添加的是前端静态的表)
      permissionStore.getAddRouters.forEach((route: any) => {
        addRoute(route as RouteRecordRaw)
      })
      permissionStore.setIsAddRouters(true)
      push({ path: '/home' })
    }
  } else {
    push({ path: '/login' })
  }
}

// 在后端渲染时获取角色信息
const getRole = async () => {
  // 后端传递表
  // const res = await getRdRouterApi()
  // code过滤表
  const res = await getCodeRouterApi()

  if (res.status == 200) {
    wsCache.set('roleRouters', res.data)
    // await permissionStore.generateRoutes('rdRouter', res.data).catch(() => { })
    await permissionStore.generateRoutes('codeRouter', res.data).catch(() => {})
    permissionStore.getAddRouters.forEach((route: any) => {
      addRoute(route as RouteRecordRaw)
    })
    permissionStore.setIsAddRouters(true)
    push({ path: '/home' })
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
        message: t('login.messageSuccess'),
        type: 'success'
      })
      returnLogin()
    }
  } else {
    ElMessage({
      message: t('login.messageWarning'),
      type: 'warning'
    })
  }
}

const returnLogin = () => {
  isRegister.value = !isRegister.value
}

// 可以这样去定义ref实例的类型
const elfRef = ref<InstanceType<typeof Elform>>()

// Required这个将类型中的可选参数变成必选参数
interface foo {
  fee?: string
  fdd: number
}
const fff: Required<foo> = {
  fee: '123',
  fdd: 123
}

// 重置登录的初始值
// const empty = () => {
//   Object.assign(from, new fromData())
// }
</script>

<template>
  <div class="index">
    <img src="@/assets/imgs/loginBg.jpg" class="loginBg" alt="" />
    <div class="loginLogo cursor-pointer flex flex-row" @click="toDocument">
      <UseSvg name="vuex-store" class="h-full w-full" />
    </div>
    <div class="i18nIcon cursor-pointer flex flex-row">
      <ElLocaleDropdown />
    </div>
    <div
      @click="toDocument"
      class="loginText cursor-pointer flex items-center text-white text-xl font-bold"
    >
      cxwii-Admin
    </div>
    <div class="loginPage flex">
      <div
        class="introduce max-[1100px]:hidden flex flex-col justify-center items-center text-3xl font-medium text-white"
      >
        <div class="mb-5">{{ t('introduce.introduce1') }}</div>
        <div class="text-2xl font-normal">{{ t('introduce.introduce2') }}</div>
        <div class="text-2xl font-normal">{{ t('introduce.introduce3') }}</div>
      </div>
      <div class="formContainer">
        <Elform
          ref="ElformRef"
          v-if="!isRegister"
          :is-button="true"
          :is-Register="isRegister"
          @on-login="login"
          @on-register="register"
          :model="loginFrom"
          label-position="top"
        />
        <Elform
          v-else
          :is-button="true"
          :is-Register="isRegister"
          @on-to-register="toRegister"
          @on-return-login="returnLogin"
          :model="registerFrom"
          label-position="top"
        />
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

  .i18nIcon {
    position: absolute;
    right: 40px;
    top: 40px;
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
