<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import MetronomeBlink from '@/components/Metronome/MetronomeBlink.vue'
import GameJudge from './Common/GameJudge.vue'
import { generateRandomTempo, minTempo, maxTempo, stepTempo } from '@/functions/generateRandomTempo'

import { useMetronome } from '@/composables/metronome'
import { useGameAManagerStore, numberOfQuestions, gameAJudge } from '@/stores/gameAManager'
import { usePageManagerStore } from '@/stores/pageManager'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  mode: 'game' | 'practice'
}>()

const gameAManager = useGameAManagerStore()
const pageManager = usePageManagerStore()
const { bpm, beat, start: startMetronome, stop: stopMetronome } = useMetronome()
const { t } = useI18n()

const answerBpm = ref(60)
const isShowResult = ref(false)

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
  if (props.mode === 'game') {
    if (gameAManager.isFinishing) {
      pageManager.goToThePage('ResultA')
      return
    }
    gameAManager.addJudgeResults(judge.value)
  }
  start()
}
const handleGoToTop = () => {
  pageManager.goToThePage('Top')
}
</script>

<template>
  <article>
    <h2>{{ mode === 'game' ? 'Game' : 'Practice' }} A</h2>
    <p class="description">
      {{ t('description') }}<br />
      <small>
        {{ t('description_bpm', { minTempo, maxTempo, stepTempo }) }}<br />
        ex) {{ `${minTempo}, ${minTempo + 4}, ${minTempo + 8}, ..., ${maxTempo - 4}, ${maxTempo}` }}
      </small>
    </p>
    <MetronomeBlink
      :beat="beat"
      class="metronome-area"
    />
    <div class="bpm-area">
      <div>
        <label for="answer">
          <p>{{ t('your_answer') }}:</p></label
        >
        <VTextField
          id="answer"
          v-model.number="answerBpm"
          type="number"
          :min="minTempo"
          :max="maxTempo"
          :step="stepTempo"
          :disabled="isShowResult"
          class="input"
          :rules="[(value: number) => {
            return (minTempo <= value && value <= maxTempo) && (value % 4 === 0) || 'NG'
          }]"
        />
      </div>
      <div>
        <p>{{ t('correct_answer') }}:</p>
        <div class="correct-answer">
          <p :class="isShowResult ? '' : 'hidden'">
            {{ bpm }}
          </p>
        </div>
      </div>
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
      v-model="gameAManager.now"
      color="light-blue-lighten-1"
      height="25"
      :max="numberOfQuestions"
      v-if="mode === 'game'"
    >
      {{ gameAManager.now }} / {{ numberOfQuestions }}
    </VProgressLinear>
    <div>
      <VBtn
        @click="handleNext"
        :disabled="!isShowResult"
      >
        {{ gameAManager.isFinishing ? t('finish') : t('next') }}</VBtn
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
            gameAManager.debugFinish()
            pageManager.goToThePage('ResultA')
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
  description: 'BPMを推測しよう！'
  description_bpm: 'BPMは{minTempo}〜{maxTempo}の{stepTempo}刻み。'
  your_answer: 'あなたの回答'
  correct_answer: '正解'
  judge: '判定！'
  next: '次の問題'
  finish: '結果を見る'
  practice_goto_top: 'トップに戻る'
en:
  description: 'Guess what the BPM is!'
  description_bpm: 'BPM increases by {stepTempo} from {minTempo} to {maxTempo};'
  your_answer: 'Your Answer'
  correct_answer: 'Correct Answer'
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
  max-width: 50%;
  height: 10vh;
  margin-left: auto;
  margin-right: auto;
}
.bpm-area {
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
}
.input {
  font-weight: bold;
  text-align: center;
}
.correct-answer {
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
