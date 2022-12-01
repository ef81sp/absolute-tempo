<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useMetronome } from '@/composables/metronome'
const { bpm, beat, start: startMetronome, stop: stopMetronome } = useMetronome()
const answerBpm = ref(60)
const isShowResult = ref(false)

const generateRandomTempo = (): number => {
  return (10 + Math.ceil(Math.random() * 50)) * 4
}

const start = () => {
  stopMetronome()
  bpm.value = generateRandomTempo()
  isShowResult.value = false
  startMetronome()
}

const judge = computed(() => {
  const _bpm = unref(bpm)
  const _answerBpm = Number(unref(answerBpm))

  if (_bpm === _answerBpm) return 'PERFECT!!'
  else if (Math.abs(_bpm - _answerBpm) <= 4) return 'GREAT!!'
  else if (Math.abs(_bpm - _answerBpm) <= 8) return 'GOOD!'
  return 'POOR'
})
const handleGuess = () => {
  isShowResult.value = true
}
</script>

<template>
  <article>
    <h2>Game A</h2>
    <p>Guess it!</p>
    <div>
      <button @click="start">start</button>
    </div>
    <div>
      .<Transition> <span v-show="beat">🟡</span> </Transition>
    </div>
    <div>
      <p>Your Answer BPM: {{ answerBpm }}</p>
      <input
        type="range"
        min="40"
        max="240"
        step="4"
        v-model="answerBpm"
        :disabled="isShowResult"
      />
    </div>
    <button @click="handleGuess">Judge!!</button>
    <p>
      .<span v-show="isShowResult">{{ judge }} / {{ bpm }}</span>
    </p>
  </article>
</template>

<style scoped>
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
