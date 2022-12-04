import { it, expect } from 'vitest'
import { calcPointsGameA, ratingGameA } from './calcPointsGameA'

it('correct points', () => {
  expect(calcPointsGameA(['PERFECT', 'PERFECT', 'PERFECT', 'PERFECT', 'PERFECT'])).toBe(25)
  expect(calcPointsGameA(['PERFECT', 'GREAT', 'GOOD', 'POOR', 'BAD'])).toBe(12)
  expect(calcPointsGameA(['BAD', 'BAD', 'BAD', 'BAD', 'BAD'])).toBe(0)
})

it('correct rating with points', () => {
  expect(ratingGameA(100, 100)).toBe('EXCELLENT')
  expect(ratingGameA(99, 100)).toBe('S')
  expect(ratingGameA(85, 100)).toBe('S')
  expect(ratingGameA(84, 100)).toBe('A')
  expect(ratingGameA(70, 100)).toBe('A')
  expect(ratingGameA(69, 100)).toBe('B')
  expect(ratingGameA(55, 100)).toBe('B')
  expect(ratingGameA(54, 100)).toBe('C')
  expect(ratingGameA(40, 100)).toBe('C')
  expect(ratingGameA(39, 100)).toBe('D')
  expect(ratingGameA(25, 100)).toBe('D')
  expect(ratingGameA(24, 100)).toBe('E')
  expect(ratingGameA(10, 100)).toBe('E')
  expect(ratingGameA(9, 100)).toBe('F')
  expect(ratingGameA(0, 100)).toBe('F')
})
it('correct rating with judgeResults', () => {
  expect(ratingGameA(['PERFECT', 'PERFECT', 'PERFECT', 'PERFECT', 'PERFECT'])).toBe('EXCELLENT')
  expect(ratingGameA(['PERFECT', 'PERFECT', 'PERFECT', 'PERFECT', 'GREAT'])).toBe('S')
  expect(ratingGameA(['GREAT', 'GREAT', 'GREAT', 'GREAT', 'GREAT'])).toBe('A')
  expect(ratingGameA(['GOOD', 'GOOD', 'GOOD', 'GOOD', 'GOOD'])).toBe('B')
  expect(ratingGameA(['PERFECT', 'GREAT', 'GOOD', 'POOR', 'BAD'])).toBe('C')
  expect(ratingGameA(['GOOD', 'GOOD', 'POOR', 'BAD', 'BAD'])).toBe('D')
  expect(ratingGameA(['POOR', 'POOR', 'POOR', 'POOR', 'POOR'])).toBe('E')
  expect(ratingGameA(['BAD', 'BAD', 'BAD', 'BAD', 'BAD'])).toBe('F')
})