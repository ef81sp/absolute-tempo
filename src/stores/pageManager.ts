type GameType = 'A' | 'B' | 'Karuta'
type PageAboutGame = `Game${GameType}` | `Practice${GameType}` | `Result${GameType}`
export type PageName = 'Top' | PageAboutGame
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
