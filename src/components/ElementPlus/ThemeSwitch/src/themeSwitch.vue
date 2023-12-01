<script setup lang="ts">
import { ref } from 'vue'
import { ElSwitch } from 'element-plus'
import { useIcon } from '@/hooks/web/useIcon'
import { useUserStore } from '@/store/modules/user'

const Sun = useIcon({ icon: 'element-icons el-icon-taiyang' })
const CrescentMoon = useIcon({ icon: 'element-icons el-icon-yueliang1' })

const userStore = useUserStore()

const isDark = ref(userStore.getIsDark as any)

const themeChange = (val: any) => {
  userStore.setIsDark(val)
}
</script>

<template>
  <ElSwitch
    v-model="isDark"
    inline-prompt
    inactive-color="#4c4d4f"
    active-color="#dcdfe6"
    :active-icon="Sun"
    :inactive-icon="CrescentMoon"
    @change="themeChange"
  />
</template>

<style scoped lang="scss"></style>
