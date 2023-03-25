<script lang="tsx">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { defineComponent, PropType } from 'vue'

interface FormProps {
  formModel: {
    userName: string,
    password: number
  },
  ifButton: string
}

export default defineComponent({
  props: {
    model: {
      type: Object as PropType<FormProps['formModel']>,
      required: true
    },
    // 是否渲染两个button,渲染的话还要传递两个button对应的方法
    ifButton: {
      type: String as PropType<FormProps['ifButton']>,
      default: 'false'
    }
  },
  emits: ['onLogin', 'onEmpty'],
  setup(props, { slots, emit }) {
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
          <ElFormItem label="userName">
            <ElInput v-model={props.model.userName} />
          </ElFormItem>
          <ElFormItem label="password">
            <ElInput v-model={props.model.password} />
          </ElFormItem>
          {
            props.ifButton == "true"
              ? <ElFormItem>
                  <ElButton onClick={() => onLogin()} type="primary" class="loginButtob">login</ElButton>
                  <ElButton onClick={() => onEmpty()} class="emptyButtob">empty</ElButton>
                </ElFormItem>
              : null
          }
        </>
      )
    }

    return () => (
      <ElForm
        class="form"
        model={props.model}
      >
        {
          // 自定义内容了就只返一个elForm标签,否则才根据数据渲染内容
          slots.default ? slots.default() : formTemplate()
        }
      </ElForm>
    )
  }
})
</script>

<style scoped lang="scss">
.form {
  width: 300px;
  .loginButtob {
    width: 300px;
  }

  .emptyButtob {
    width: 300px;
    margin-left: 0px;
    margin-top: 12px;
  }
}
</style>