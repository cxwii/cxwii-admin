import EldropdownMenu from './src/DropdownMenu.vue'
import { ElDropdown } from 'element-plus'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface EldropdownMenuExpose {
  elDropdownMenuRef: ComponentRef<typeof ElDropdown>
  tagItem: RouteLocationNormalizedLoaded
}
export { EldropdownMenu }
