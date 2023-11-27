<script setup lang="ts">
import { computed, unref } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { useLocale } from '@/hooks/web/useLocale'
import ProjectTypes from '@/utils/propTypes'

import { useI18n } from '@/hooks/web/useI18n'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { usePermissionStore } from '@/store/modules/permission'
const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()
const { t } = useI18n()

const props = defineProps({
  fontSize: ProjectTypes.string.def('18px')
})

const localeStore = useLocaleStoreWithOut()

const langMap = computed(() => localeStore.getLocaleMap)

const currentLang = computed(() => localeStore.getCurrentLocale)

const setLang = (lang: LocaleType) => {
  if (lang === unref(currentLang).lang) return
  // 需要重新加载页面让整个语言多初始化(存疑)
  // window.location.reload()
  localeStore.setCurrentLocale({
    lang
  })

  const { changeLocale } = useLocale()
  changeLocale(lang)

  // RenderTitle(tagsViewStore.getVisitedViews)
  // RenderTitle(permissionStore.getAddRouters)

  // console.log('tagsViewStore :>> ', tagsViewStore.getVisitedViews);
  // console.log('permissionStore :>> ', permissionStore.getAddRouters);
}

const RenderTitle = (menuRouters: any) => {
  menuRouters.forEach((item: any) => {
    if (item.hasOwnProperty('children')) {
      item.meta.title = t(item.meta.title)
      RenderTitle(item.children)
    } else {
      item.meta.title = t(item.meta.title)
    }
  })
}
</script>

<template>
  <ElDropdown trigger="click" @command="setLang">
    <ElIcon
      :style="`font-size:${props.fontSize}`"
      class="cursor-pointer element-icons el-icon-zhongyingwen"
    />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in langMap" :key="item.lang" :command="item.lang">
          {{ item.name }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
