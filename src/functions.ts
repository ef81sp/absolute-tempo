import type { JudgeResult } from './types'

type GameAJudge = (answerBpm: number, correctBpm: number) => JudgeResult

export const gameAJudge: GameAJudge = (answerBpm, correctBpm) => {
  if (answerBpm === correctBpm) return 'PERFECT'
  else if (Math.abs(answerBpm - correctBpm) <= 4) return 'GREAT'
  else if (Math.abs(answerBpm - correctBpm) <= 8) return 'GOOD'
  return 'POOR'
}
