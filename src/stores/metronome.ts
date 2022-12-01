import { useMetronome } from '@/composables/metronome'
import { defineStore } from 'pinia'

export const useMetronomeStore = defineStore('metronome', () => {
  const { bpm, beat, start, stop, tap, internalValues } = useMetronome()

  return {
    bpm,
    beat,
    start,
    stop,
    tap,
    internalValues,
  }
})
