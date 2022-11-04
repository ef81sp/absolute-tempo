<script setup lang="ts">
import { ref } from 'vue'
import { useMetronome } from '@/composables/metronome'
const { bpm: answerBpm, beat, tap, start: startMetronome, stop: stopMetronome } = useMetronome()

const targetBpm = ref<number>(60)
const isShowResult = ref(false)
const result = ref('')

const generateRandomTempo = (): number => {
  return (10 + Math.ceil(Math.random() * 50)) * 4
}

const start = () => {
  isShowResult.value = false
  stopMetronome()
  targetBpm.value = generateRandomTempo()
  startMetronome()
}

const judge = (_targetBpm: number, _answerBpm: number) => {
  if (_targetBpm === _answerBpm) return 'PERFECT!!'
  else if (Math.abs(_targetBpm - _answerBpm) <= 4) return 'GREAT!!'
  else if (Math.abs(_targetBpm - _answerBpm) <= 8) return 'GOOD!'
  return 'POOR'
}
const handleJudge = () => {
  isShowResult.value = true
  result.value = judge(targetBpm.value, answerBpm.value)
}
</script>

<template>
  <article>
    <h2>Game B</h2>
    <p>Beat it!</p>
    <div>
      <button @click="start">start</button>
    </div>
    <p>Desinated BPM: {{ targetBpm }}</p>
    <div>
      <button @click="tap">beat</button>
    </div>
    <div>
      <p>
        Your Answer: <Transition> <span v-show="beat">🟡</span> </Transition>
      </p>
    </div>
    <button @click="handleJudge">Judge!!</button>
    <p>
      .<span v-show="isShowResult">{{ result }} / {{ answerBpm }}</span>
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
