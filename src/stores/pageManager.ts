import type { Difficulty as KarutaDifficulty } from './karutaManager'
type GameType = 'A' | 'B'
type Karuta = `Karuta${KarutaDifficulty}`
type PageAboutGame = `Game${GameType}` | `Practice${GameType}` | `Result${GameType}`
export type PageName = 'Top' | PageAboutGame | Karuta
import { ref } from 'vue'
import { defineStore } from 'pinia'
// Vue Routerでいい気もする
export const usePageManagerStore = defineStore('pageManager', () => {
  const nowPage = ref<PageName>('Top')
  const goToThePage = (pageName: PageName) => {
    nowPage.value = pageName
  }
  const goToTop = () => {
    nowPage.value = 'Top'
  }

  return { nowPage, goToThePage, goToTop }
})
