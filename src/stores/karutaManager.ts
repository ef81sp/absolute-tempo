import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { generateRandomTempo } from '@/functions/generateRandomTempo'

export type Card = {
  id: number
  bpm: number
  cleared: boolean
}

const numberOfCards = 9

const _generateInitalizedCards = (): Card[] => {
  const result: Card[] = []

  const _generateUniqueRandomTempo = () => {
    for (;;) {
      const tempo = generateRandomTempo()
      if (result.every((card) => card.bpm !== tempo)) {
        return tempo
      }
    }
  }

  for (let index = 0; index < numberOfCards; index++) {
    const card: Card = {
      id: index,
      bpm: _generateUniqueRandomTempo(),
      cleared: false,
    }
    result.push(card)
  }

  return result
}

export const useKarutaManagerStore = defineStore('karutaStore', () => {
  const cards = ref<Card[]>(_generateInitalizedCards())
  const remainingCards = computed(() => cards.value.filter((card) => card.cleared === false))
  const remainingTempo = computed(() => cards.value.filter((card) => card.cleared === false).map((card) => card.bpm))
  const takenNumber = computed<number>(() => cards.value.filter((card) => card.cleared).length)

  const targetTempo = ref<number>(cards.value[Math.floor(Math.random() * numberOfCards)].bpm)

  const init = () => {
    cards.value = _generateInitalizedCards()
    targetTempo.value = cards.value[Math.floor(Math.random() * numberOfCards)].bpm
  }

  const take = (cardId: Card['id']): boolean => {
    const takenCard = cards.value.find((card) => card.id === cardId)
    if (takenCard === undefined) throw new Error('id out of range')
    if (targetTempo.value !== takenCard.bpm) return false
    if (takenCard.cleared) return false
    takenCard.cleared = true
    targetTempo.value = remainingTempo.value[Math.floor(Math.random() * remainingTempo.value.length)]
    return true
  }

  const allCleared = computed(() => remainingCards.value.length === 0)

  return {
    cards,
    remainingCards,
    remainingTempo,
    takenNumber,
    targetTempo,
    init,
    take,
    allCleared,
  }
})
