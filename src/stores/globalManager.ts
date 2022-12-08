export type PageName = 'Top' | 'GameA' | 'PracticeA' | 'PracticeB' | 'GameB' | 'ResultA' | 'ResultB'
import { ref } from 'vue'
import { defineStore } from 'pinia'
// Vue Routerでいい気もする
export const useGlobalManagerStore = defineStore('globalManager', () => {
  const nowPage = ref<PageName>('Top')
  const goToThePage = (pageName: PageName) => {
    nowPage.value = pageName
  }

  return { nowPage, goToThePage }
})
