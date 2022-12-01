import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Rating, JudgeResult } from '@/types'

export const useGameAManagerStore = defineStore('gameAManager', () => {
  const now = ref<number>(1)
  const judgeResults = ref<JudgeResult[]>([])
  const addJudgeResults = (result: JudgeResult) => {
    judgeResults.value.push(result)
    now.value++
  }
  const rating = computed<Rating>(() => {
    return 'EXCELLENT'
  })
  const init = (): void => {
    now.value = 1
    judgeResults.value = []
  }

  return { now, judgeResults, addJudgeResults, rating, init }
})
