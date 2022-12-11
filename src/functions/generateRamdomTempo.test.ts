import { beforeAll, describe, expect, it } from 'vitest'
import { generateRandomTempo, maxTempo, minTempo } from './generateRandomTempo'

describe('generateRandomTempoのテスト', () => {
  let target: number[]
  beforeAll(() => {
    target = [...Array(10000000)].map(generateRandomTempo)
  })
  it('minTempoからmaxTempoの範囲に収まる', () => {
    expect(target.every((v) => minTempo <= v && v <= maxTempo)).toBe(true)
  })
  it('minTempoが含まれる', () => {
    expect(target.some((v) => v === minTempo)).toBe(true)
  })
  it('maxTempoが含まれる', () => {
    expect(target.some((v) => v === maxTempo)).toBe(true)
  })
  it('全部4で割り切れる', () => {
    expect(target.every((v) => v % 4 === 0)).toBe(true)
  })
})
