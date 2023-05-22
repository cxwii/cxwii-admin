<script setup lang="tsx">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { PropType, useSlots, useAttrs } from 'vue'

interface FormProps {
  formModel: {
    userName: string,
    password: number
  },
  ifButton: string
}

const props = defineProps({
  model: {
    type: Object as PropType<FormProps['formModel']>,
    required: true
  },
  // 是否渲染两个button,渲染的话还要传递两个button对应的方法
  ifButton: {
    type: String as PropType<FormProps['ifButton']>,
    default: 'false'
  }
})

const emit = defineEmits(['onLogin', 'onEmpty'])

const slots = useSlots()
const attrs = useAttrs()

const onLogin = () => {
  emit('onLogin')
}
const onEmpty = () => {
  emit('onEmpty')
}

// 在不提供自定义内容时渲染(提供时只渲染一个正常ElForm标签)
const formTemplate = () => {
  return (
    <>
      <ElFormItem class="cc" label="用户名">
        <ElInput v-model={props.model.userName} />
      </ElFormItem>
      <ElFormItem label="密码">
        <ElInput v-model={props.model.password} />
      </ElFormItem>
      {
        props.ifButton == "true"
          ? <ElFormItem>
            <ElButton
              onClick={() => onLogin()}
              type="primary"
              class="loginButtob"
            >
              登录
            </ElButton>
            <ElButton
              onClick={() => onEmpty()}
              class="emptyButtob"
            >
              重置
            </ElButton>
          </ElFormItem>
          : null
      }
    </>
  )
}

const app = () => {
  return (
    <ElForm
      class="form"
      model={props.model}
      {...attrs}
    >
      {
        // 自定义内容了就只返一个elForm标签,否则才根据数据渲染内容
        slots.default ? slots.default() : formTemplate()
      }
    </ElForm>
  )
}
</script>

<template>
  <app>
  </app>
</template>

<style scoped lang="scss">
.form {
  width: 300px;

  // 这里要用穿透是因为formTemplate是作为app的子组件存在如果不穿透的话因为有scoped在就会失效
  :deep(.loginButtob) {
    width: 300px;
  }

  :deep(.emptyButtob) {
    width: 300px;
    margin-left: 0px;
    margin-top: 12px;
  }
}
</style>