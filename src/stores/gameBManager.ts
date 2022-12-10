import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Rating, JudgeResult } from '@/types'
import { rate } from './functions/calcPoints'

export const numberOfQuestions = 5

type GameBJudge = (answerBpm: number, correctBpm: number) => JudgeResult
export const gameBJudge: GameBJudge = (answerBpm, correctBpm) => {
  if (Math.abs(answerBpm - correctBpm) <= 2) return 'PERFECT'
  else if (Math.abs(answerBpm - correctBpm) <= 6) return 'GREAT'
  else if (Math.abs(answerBpm - correctBpm) <= 10) return 'GOOD'
  else if (Math.abs(answerBpm - correctBpm) <= 16) return 'POOR'
  return 'BAD'
}

export const useGameBManagerStore = defineStore('gameBManager', () => {
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
