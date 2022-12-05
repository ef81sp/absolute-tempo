<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import GameAMetronomeBlink from './GameAMetronomeBlink.vue'
import GameAJudgeResult from './GameAJudgeResult.vue'

import { useMetronome } from '@/composables/metronome'
import { useGameAManagerStore, numberOfQuestions, gameAJudge } from '@/stores/gameAManager'
import { useGlobalManagerStore } from '@/stores/globalManager'

const gameAManager = useGameAManagerStore()
const globalManager = useGlobalManagerStore()
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

onMounted(() => {
  gameAManager.init()
  start()
})
const judge = computed(() => gameAJudge(answerBpm.value, bpm.value))
const handleJudge = () => {
  isShowResult.value = true
}
const handleNext = () => {
  if (gameAManager.isFinishing) {
    globalManager.goToThePage('ResultA')
  }
  gameAManager.addJudgeResults(judge.value)
  start()
}
</script>

<template>
  <article>
    <h2>Game A</h2>
    <p>Guess what the BPM is!</p>
    <GameAMetronomeBlink
      :beat="beat"
      class="metronome-area"
    />
    <div class="bpm-area">
      <div>
        <label for="answer"> <p>Your Answer:</p></label>
        <VTextField
          id="answer"
          v-model.number="answerBpm"
          type="number"
          min="40"
          max="240"
          step="4"
          :disabled="isShowResult"
          class="input"
        />
      </div>
      <div>
        <p>Correct Answer:</p>
        <p
          class="correct-answer"
          :class="isShowResult ? '' : 'hidden'"
        >
          {{ bpm }}
        </p>
      </div>
    </div>
    <div>
      <VBtn
        @click="handleJudge"
        :disabled="isShowResult"
        >Judge!!</VBtn
      >
    </div>
    <div>
      <GameAJudgeResult
        :judge-result="judge"
        :class="isShowResult ? 'judge' : 'judge hidden'"
      />
    </div>
    <VProgressLinear
      v-model="gameAManager.now"
      color="light-blue-lighten-1"
      height="25"
      :max="numberOfQuestions"
    >
      <strong>{{ gameAManager.now }} / {{ numberOfQuestions }}</strong>
    </VProgressLinear>
    <div>
      <VBtn
        @click="handleNext"
        :disabled="!isShowResult"
        >Next</VBtn
      >
    </div>
    <div>
      <VBtn
        color="error"
        @click="
          () => {
            gameAManager.debugFinish()
            globalManager.goToThePage('ResultA')
          }
        "
      >
        DEBUG FINISH
      </VBtn>
    </div>
  </article>
</template>

<style scoped>
article {
  text-align: center;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
}
article > * + * {
  margin-top: 1rem;
}
.metronome-area {
  max-width: 50%;
  height: 10vh;
  margin-left: auto;
  margin-right: auto;
}
.bpm-area {
  display: flex;
  justify-content: space-between;
}
.input {
  font-weight: bold;
  text-align: center;
}
.correct-answer {
  font-size: 2rem;
}
.judge {
  font-size: 2rem;
  font-weight: bold;
}
.hidden {
  visibility: hidden;
}
</style>
