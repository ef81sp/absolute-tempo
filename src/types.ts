export const judgeResults = ['PERFECT', 'GREAT', 'GOOD', 'POOR'] as const
export type JudgeResult = typeof judgeResults[number]
export const ratings = ['EXCELLENT', 'S', 'A', 'B', 'C', 'D', 'E'] as const
export type Rating = typeof ratings[number]
