import type { JudgeResult, Rating } from '@/types'

/*
 Perfect: 5 pts
 Great:   4 pts
 Good:    3 pts
 Poor:    1 pts
 Bad:     0 pts

 EXC:     100 %
 S:      >=85 %
 A:      >=70 %
 B:      >=55 %
 C:      >=40 %
 D:      >=25 %
 E:      >=10 %
 F:       <10 %
*/
const pointMaster = new Map<JudgeResult, number>([
  ['PERFECT', 5],
  ['GREAT', 4],
  ['GOOD', 3],
  ['POOR', 1],
  ['BAD', 0],
])
export const calcPointsGameA = (judgeResults: JudgeResult[]) => {
  return judgeResults.reduce((prev, cur) => prev + pointMaster.get(cur)!, 0)
}

type RatingGameA = {
  (target: JudgeResult[]): Rating
  (target: number, max: number): Rating
}
export const ratingGameA: RatingGameA = (target: number | JudgeResult[], max?: number): Rating => {
  let point: number = 0
  if (typeof target === 'number') {
    if (max == undefined) {
      throw new Error('引数必須: max')
    }
    if (target > max) {
      throw new Error('target より max がでかい')
    }
    point = target / max
  } else {
    point = calcPointsGameA(target) / (5 * target.length)
  }

  if (point === 1) return 'EXCELLENT'
  else if (point >= 0.85) return 'S'
  else if (point >= 0.7) return 'A'
  else if (point >= 0.55) return 'B'
  else if (point >= 0.4) return 'C'
  else if (point >= 0.25) return 'D'
  else if (point >= 0.1) return 'E'
  else return 'F'
}
