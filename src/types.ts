export const judgeResults = ['PERFECT', 'GREAT', 'GOOD', 'POOR', 'BAD'] as const
export type JudgeResult = typeof judgeResults[number]
export const ratings = ['EXCELLENT', 'S', 'A', 'B', 'C', 'D', 'E', 'F'] as const
export type Rating = typeof ratings[number]
