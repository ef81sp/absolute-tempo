import { it, expect } from 'vitest'
import { calcPoints, rate } from './calcPoints'

it('correct points', () => {
  expect(calcPoints(['PERFECT', 'PERFECT', 'PERFECT', 'PERFECT', 'PERFECT'])).toBe(25)
  expect(calcPoints(['PERFECT', 'GREAT', 'GOOD', 'POOR', 'BAD'])).toBe(13)
  expect(calcPoints(['BAD', 'BAD', 'BAD', 'BAD', 'BAD'])).toBe(0)
})

it('correct rating with points', () => {
  expect(rate(100, 100)).toBe('EXCELLENT')
  expect(rate(99, 100)).toBe('S')
  expect(rate(85, 100)).toBe('S')
  expect(rate(84, 100)).toBe('A')
  expect(rate(70, 100)).toBe('A')
  expect(rate(69, 100)).toBe('B')
  expect(rate(55, 100)).toBe('B')
  expect(rate(54, 100)).toBe('C')
  expect(rate(40, 100)).toBe('C')
  expect(rate(39, 100)).toBe('D')
  expect(rate(25, 100)).toBe('D')
  expect(rate(24, 100)).toBe('E')
  expect(rate(10, 100)).toBe('E')
  expect(rate(9, 100)).toBe('F')
  expect(rate(0, 100)).toBe('F')
})
it('correct rating with judgeResults', () => {
  expect(rate(['PERFECT', 'PERFECT', 'PERFECT', 'PERFECT', 'PERFECT'])).toBe('EXCELLENT')
  expect(rate(['PERFECT', 'PERFECT', 'PERFECT', 'PERFECT', 'GREAT'])).toBe('S')
  expect(rate(['GREAT', 'GREAT', 'GREAT', 'GREAT', 'GREAT'])).toBe('A')
  expect(rate(['GOOD', 'GOOD', 'GOOD', 'GOOD', 'GOOD'])).toBe('B')
  expect(rate(['PERFECT', 'GREAT', 'GOOD', 'POOR', 'BAD'])).toBe('C')
  expect(rate(['GOOD', 'GOOD', 'POOR', 'BAD', 'BAD'])).toBe('D')
  expect(rate(['POOR', 'POOR', 'POOR', 'POOR', 'POOR'])).toBe('E')
  expect(rate(['BAD', 'BAD', 'BAD', 'BAD', 'BAD'])).toBe('F')
})