import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

export const usePageLoading = () => {
  const loadStart = () => {
    userStore.setPageLoading(true)
  }

  const loadDone = () => {
    userStore.setPageLoading(false)
  }

  return {
    loadStart,
    loadDone
  }
}
