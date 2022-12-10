<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import MetronomeBlink from '@/components/Metronome/MetronomeBlink.vue'
import GameJudge from './Common/GameJudge.vue'

import { useMetronome } from '@/composables/metronome'
import { useGameBManagerStore, numberOfQuestions, gameBJudge } from '@/stores/gameBManager'
import { useGlobalManagerStore } from '@/stores/globalManager'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  mode: 'game' | 'practice'
}>()

const gameBManager = useGameBManagerStore()
const globalManager = useGlobalManagerStore()
const { bpm, beat, start: startMetronome, stop: stopMetronome, tap } = useMetronome()
const { t } = useI18n()

const targetBpm = ref<number>(60)
const isShowResult = ref(false)

const generateRandomTempo = (): number => {
  return (10 + Math.ceil(Math.random() * 50)) * 4
}

const start = () => {
  isShowResult.value = false
  stopMetronome()
  targetBpm.value = generateRandomTempo()
  startMetronome()
}

onMounted(() => {
  gameBManager.init()
  start()
})

const judge = computed(() => gameBJudge(targetBpm.value, bpm.value))

const handleJudge = () => {
  isShowResult.value = true
}

const handleNext = () => {
  if (props.mode === 'game') {
    if (gameBManager.isFinishing) {
      globalManager.goToThePage('ResultB')
      return
    }
    gameBManager.addJudgeResults(judge.value)
  }
  start()
}
const handleGoToTop = () => {
  globalManager.goToThePage('Top')
}
</script>

<template>
  <article>
    <h2>{{ mode === 'game' ? 'Game' : 'Practice' }} B</h2>
    <p>{{ t('description') }}</p>
    <div class="bpm-area">
      <div>
        <p>{{ t('target_answer') }}:</p>
        <div class="target-answer">
          <p>
            {{ targetBpm }}
          </p>
        </div>
      </div>
      <div>
        <p>{{ t('your_answer') }}:</p>
        <div
          class="your-answer"
          v-if="isShowResult"
        >
          <p>
            {{ bpm }}
          </p>
        </div>
        <MetronomeBlink
          :beat="beat"
          class="metronome-area"
          v-else
        />
      </div>
    </div>

    <div>
      <VBtn
        @click="tap"
        size="x-large"
        class="beat-button"
        :disabled="isShowResult"
        >BEAT!!</VBtn
      >
    </div>

    <div>
      <VBtn
        @click="handleJudge"
        :disabled="isShowResult"
        color="info"
        >{{ t('judge') }}</VBtn
      >
    </div>
    <div>
      <GameJudge
        :judge-result="judge"
        :class="isShowResult ? 'judge' : 'judge hidden'"
      />
    </div>
    <VProgressLinear
      v-model="gameBManager.now"
      color="light-blue-lighten-1"
      height="25"
      :max="numberOfQuestions"
      v-if="mode === 'game'"
    >
      {{ gameBManager.now }} / {{ numberOfQuestions }}
    </VProgressLinear>
    <div>
      <VBtn
        @click="handleNext"
        :disabled="!isShowResult"
      >
        {{ gameBManager.isFinishing ? t('finish') : t('next') }}</VBtn
      >
    </div>
    <div>
      <VBtn
        @click="handleGoToTop"
        v-if="mode === 'practice'"
      >
        {{ t('practice_goto_top') }}</VBtn
      >
      <!-- <VBtn
        color="error"
        @click="
          () => {
            gameBManager.debugFinish()
            globalManager.goToThePage('ResultB')
          }
        "
      >
        DEBUG FINISH
      </VBtn> -->
    </div>
  </article>
</template>

<i18n lang="yaml">
ja:
  description: '目標BPMに合わせて拍を打とう！'
  your_answer: 'あなたの回答'
  target_answer: '目標BPM'
  judge: '判定！'
  next: '次の問題'
  finish: '結果を見る'
  practice_goto_top: 'トップに戻る'
en:
  description: 'Beat to the Target BPM!'
  your_answer: 'Your Answer'
  target_answer: 'Target BPM'
  judge: 'Judge!'
  next: 'Next'
  finish: 'Finish'
  practice_goto_top: 'Return to Top'
</i18n>

<style scoped>
article {
  text-align: center;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
}
article > * + * {
  margin-top: 0.75rem;
}

.description {
  margin-top: 0.5rem;
  font-size: smaller;
  line-height: 1.3em;
}
.metronome-area {
  margin-left: auto;
  margin-right: auto;
  max-width: 95%;
}
.bpm-area {
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
}
.beat-button {
  margin-bottom: 0.5rem;
  max-width: 70%;
  width: 20rem;
  height: 6.5rem;

  font-size: 2.5rem;
  font-weight: bold;
}
.target-answer {
  font-size: 2rem;
  border: 1px solid #000;
  width: 6rem;
}
.your-answer {
  font-size: 2rem;
  border: 1px solid #000;
  width: 6rem;
}
.judge {
  font-size: 2rem;
  font-weight: bold;
}
.hidden {
  visibility: hidden;
}
</style>
