import { beforeEach, describe, expect, it } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useGameAManagerStore } from './gameAManager'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('rating のテスト', () => {
  let gameAManager: ReturnType<typeof useGameAManagerStore>
  beforeEach(() => {
    gameAManager = useGameAManagerStore()
    gameAManager.init()
  })
  it('judgeResults がすべて PERFECT なら EXCELLENT', () => {
    gameAManager.judgeResults = ['PERFECT', 'PERFECT']
    expect(gameAManager.rating).toBe('EXCELLENT')
  })
})
