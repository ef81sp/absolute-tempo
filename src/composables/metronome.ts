import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { useTime } from './time'

type UseMetronome = () => {
  bpm: Ref<number>
  beat: Ref<boolean>
  start: (cb?: Function) => void
  stop: (cb?: Function) => void
  tap: () => void
  internalValues: {
    intervalMs: ComputedRef<number>
    lastBeatTime: Ref<number>
    rapTime: ComputedRef<number>
  }
}

export const useMetronome: UseMetronome = () => {
  const { time, start: timeStart, stop: timeStop } = useTime()

  const bpm = ref(60)
  const beat = ref(false)

  // debug values
  const intervalMs = computed(() => (60 / bpm.value) * 1000)
  const lastBeatTime = ref(-1)
  const rapTime = computed(() => time.value - lastBeatTime.value)

  watch(time, () => {
    if (rapTime.value < intervalMs.value) {
      beat.value = false
    } else {
      if (lastBeatTime.value < 0) {
        lastBeatTime.value = 0
      } else {
        lastBeatTime.value += intervalMs.value
      }
      beat.value = true
    }
  })

  const start = (cb?: Function) => {
    timeStart(cb)
  }
  const stop = (cb?: Function) => {
    timeStop(() => {
      lastBeatTime.value = -1
      cb && cb()
    })
  }

  const _tapHistory: number[] = []
  const _tapHistoryLength = 3

  const tap = () => {
    console.log(time.value)
    _tapHistory.push(time.value)
    if (_tapHistory.length < _tapHistoryLength) return
    if (_tapHistory.length > _tapHistoryLength) {
      _tapHistory.shift()
    }
    const historyAvelage =
      _tapHistory.map((v) => v - _tapHistory[0]).reduce((prev, cur) => prev + cur, 0) / _tapHistoryLength
    const tappedBpm = 60000 / historyAvelage
    bpm.value = Math.round(tappedBpm)
  }

  const internalValues = {
    intervalMs,
    lastBeatTime,
    rapTime,
  }
  return { bpm, beat, start, stop, tap, internalValues }
}
