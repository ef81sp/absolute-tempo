import { onUnmounted, ref } from 'vue'

export const useTime = () => {
  let requestAnimationFrameId: number
  let startTime: number
  const time = ref<number>(0)
  const step: Parameters<typeof window.requestAnimationFrame>[0] = (timestamp) => {
    if (time.value === 0) {
      time.value = timestamp
      startTime = timestamp
    } else {
      time.value = timestamp - startTime
    }
    requestAnimationFrameId = window.requestAnimationFrame(step)
  }

  onUnmounted(() => {
    window.cancelAnimationFrame(requestAnimationFrameId)
  })

  const start = (cb?: Function) => {
    time.value = 0
    requestAnimationFrameId = window.requestAnimationFrame(step)
    cb && cb()
  }
  const stop = (cb?: Function) => {
    window.cancelAnimationFrame(requestAnimationFrameId)
    cb && cb()
  }

  return { time, start, stop }
}
