import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Rating, JudgeResult } from '@/types'
import { rate } from './functions/calcPoints'

export const numberOfQuestions = 5

type GameAJudge = (answerBpm: number, correctBpm: number) => JudgeResult
export const gameAJudge: GameAJudge = (answerBpm, correctBpm) => {
  if (answerBpm === correctBpm) return 'PERFECT'
  else if (Math.abs(answerBpm - correctBpm) <= 4) return 'GREAT'
  else if (Math.abs(answerBpm - correctBpm) <= 8) return 'GOOD'
  else if (Math.abs(answerBpm - correctBpm) <= 12) return 'POOR'
  return 'BAD'
}

export const useGameAManagerStore = defineStore('gameAManager', () => {
  const now = ref<number>(1)
  const judgeResults = ref<JudgeResult[]>([])
  const addJudgeResults = (result: JudgeResult) => {
    judgeResults.value.push(result)
    now.value++
  }
  const rating = computed<Rating>(() => rate(judgeResults.value))
  const init = (): void => {
    now.value = 1
    judgeResults.value = []
  }

  const isFinishing = computed(() => now.value >= numberOfQuestions)

  const debugFinish = () => {
    judgeResults.value = Array(numberOfQuestions).map(
      () => ['PERFECT', 'GREAT', 'GOOD', 'POOR', 'BAD'][Math.floor(Math.random() * numberOfQuestions)] as JudgeResult,
    )
    now.value = numberOfQuestions
  }

  return { now, judgeResults, addJudgeResults, rating, init, isFinishing, debugFinish }
})
