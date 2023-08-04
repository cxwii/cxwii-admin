<script setup lang="tsx">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { PropType, useSlots, useAttrs } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

interface FormProps {
  formModel: {
    username: string
    password: string
    confirmPassword?: string
  }
  isButton: boolean
  isRegister: boolean
}

const props = defineProps({
  model: {
    type: Object as PropType<FormProps['formModel']>,
    required: true
  },
  // 是否渲染两个button,渲染的话还要传递两个button对应的方法
  isButton: {
    type: Boolean as PropType<FormProps['isButton']>,
    default: false
  },
  isRegister: {
    type: Boolean as PropType<FormProps['isRegister']>,
    default: false
  }
})

const emit = defineEmits(['onLogin', 'onRegister', 'onToRegister', 'onReturnLogin'])

const slots = useSlots()
const attrs = useAttrs()

// 登录的方法
const onLogin = () => {
  emit('onLogin')
}
const onRegister = () => {
  emit('onRegister')
}

// 注册的方法
const onToRegister = () => {
  emit('onToRegister')
}
const onReturnLogin = () => {
  emit('onReturnLogin')
}

// 在不提供自定义内容时渲染(提供时只渲染一个正常ElForm标签)
const useRenderForm = () => {
  return props.isRegister ? useRenderRegisterForm() : useRenderLoginForm()
}

const useRenderLoginForm = () => {
  return (
    <>
      <div class="font-bold mb-10 text-center">{t('login.loginText')}</div>
      <ElFormItem label={t('login.username')}>
        <ElInput clearable v-model={props.model.username} />
      </ElFormItem>
      <ElFormItem label={t('login.password')}>
        <ElInput show-password clearable v-model={props.model.password} />
      </ElFormItem>
      {props.isButton ? (
        <ElFormItem>
          <ElButton onClick={() => onLogin()} type="primary" class="topButtob">
            {t('login.loginText')}
          </ElButton>
          <ElButton onClick={() => onRegister()} class="bottomButtob">
            {t('login.register')}
          </ElButton>
        </ElFormItem>
      ) : null}
    </>
  )
}

const useRenderRegisterForm = () => {
  return (
    <>
      <div class="font-bold mb-10 text-center">{t('login.register')}</div>
      <ElFormItem label={t('login.username')}>
        <ElInput clearable v-model={props.model.username} />
      </ElFormItem>
      <ElFormItem label={t('login.password')}>
        <ElInput show-password clearable v-model={props.model.password} />
      </ElFormItem>
      <ElFormItem label={t('login.checkPassword')}>
        <ElInput show-password clearable v-model={props.model.confirmPassword} />
      </ElFormItem>
      {props.isButton ? (
        <ElFormItem>
          <ElButton onClick={() => onToRegister()} type="primary" class="topButtob">
            {t('login.register')}
          </ElButton>
          <ElButton onClick={() => onReturnLogin()} class="bottomButtob">
            {t('login.hasUser')}
          </ElButton>
        </ElFormItem>
      ) : null}
    </>
  )
}

const app = () => {
  return (
    <ElForm class="form" model={props.model} {...attrs}>
      {
        // 自定义内容了就只返一个elForm标签,否则才根据数据渲染内容
        slots.default ? slots.default() : useRenderForm()
      }
    </ElForm>
  )
}
</script>

<template>
  <app />
</template>

<style scoped lang="scss">
.form {
  width: 300px;

  // 这里要用穿透是因为formTemplate是作为app的子组件存在如果不穿透的话因为有scoped在就会失效
  :deep(.topButtob) {
    width: 300px;
  }

  :deep(.bottomButtob) {
    width: 300px;
    margin-left: 0px;
    margin-top: 12px;
  }
}
</style>
