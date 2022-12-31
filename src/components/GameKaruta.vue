<script setup lang="ts">
import { useKarutaManagerStore, type Card, type Difficulty } from '@/stores/karutaManager'
import { usePageManagerStore } from '@/stores/pageManager'
import { useDateFormat, useMouse, useTimestamp } from '@vueuse/core'
import { computed, onMounted, ref, toRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import GameKarutaCard from './Card/GameKarutaCard.vue'
import GameKarutaTakeJudge, { type TimingJudge } from './Card/GameKarutaTakeJudge.vue'
import TweetButton from './Common/TweetButton.vue'

const { t } = useI18n()

const karutaManager = useKarutaManagerStore()
const pageManager = usePageManagerStore()

const props = defineProps<{
  difficulty?: Difficulty
}>()
const gridClass = computed<'card-field-glid-3' | 'card-field-glid-4' | 'card-field-glid-5'>(() => {
  switch (props.difficulty) {
    case 'Normal':
      return 'card-field-glid-3'
    case 'Hard':
      return 'card-field-glid-4'
    case 'Extreme':
      return 'card-field-glid-5'
    default:
      return 'card-field-glid-3'
  }
})

onMounted(() => {
  karutaManager.init(props.difficulty)
})

const { timestamp, pause: timestampPause } = useTimestamp({ controls: true })
const { x, y } = useMouse()

let _startedTime = timestamp.value
const elapsedTimeStamp = computed(() => timestamp.value - _startedTime)
const elapsedTime = useDateFormat(elapsedTimeStamp, 'mm:ss.SSS')

watch(toRef(karutaManager, 'allCleared'), (newAllCleared) => {
  if (newAllCleared === true) {
    timestampPause()
  }
})

const wrong = ref(false)
const checkWrong = (takeResult: boolean): void => {
  if (takeResult === true) return
  wrong.value = true
  setTimeout(() => {
    wrong.value = false
  }, 3000)
}

const showJudge = ref(false)
const timingJudge = ref<TimingJudge>('perfect')
const handleClickCard = (card: Card) => {
  if (wrong.value) return
  if (card.cleared) return

  timingJudge.value = (() => {
    if (card.bpm > karutaManager.targetTempo) {
      return 'fast'
    } else if (card.bpm < karutaManager.targetTempo) {
      return 'slow'
    } else {
      return 'perfect'
    }
  })()
  showJudge.value = true
  setTimeout(() => {
    showJudge.value = false
  }, 10)

  checkWrong(karutaManager.take(card.id))
}

const gaveUp = ref(false)
const giveUp = () => {
  gaveUp.value = true
  timestampPause()
}

const tweetText = computed(() =>
  t(gaveUp.value ? 'tweetGaveUp' : 'tweetCleared', {
    time: elapsedTime.value,
    takenNumber: karutaManager.takenNumber,
    max: karutaManager.cards.length,
    difficulty: props.difficulty,
  }),
)

const finished = computed(() => gaveUp.value || karutaManager.allCleared)
</script>

<template>
  <article>
    <h2>{{ t('title') }}</h2>
    <p class="description">
      {{ t('description') }}<br />
      {{ t('description2') }}
    </p>
    <div class="d-flex justify-space-around">
      <p class="time">{{ elapsedTime }}</p>
      <p class="question">{{ karutaManager.allCleared ? 'Cleared!' : karutaManager.targetTempo }}</p>
    </div>
    <div :class="['card-field', gridClass]">
      <GameKarutaCard
        v-for="card in karutaManager.cards"
        :key="card.id"
        :card="card"
        :handle-click="
          () => {
            handleClickCard(card)
          }
        "
        :disabled="wrong || gaveUp"
      />
    </div>
    <div>
      <VBtn
        @click="giveUp"
        :disabled="finished"
        >{{ t('giveUp') }}</VBtn
      >
    </div>
    <div class="button-area">
      <VBtn
        @click="pageManager.goToTop"
        :disabled="!finished"
        >{{ t('backToTop') }}</VBtn
      >
      <TweetButton
        :text="tweetText"
        :disabled="!finished"
      />
    </div>
  </article>
  <GameKarutaTakeJudge
    :isShow="showJudge"
    :judge="timingJudge"
    :left="x"
    :top="y"
  />
</template>

<i18n lang="yaml">
ja:
  title: かるた
  description: '指定されたテンポと同じテンポのカードを取ろう！'
  description2: 'お手つきは3秒のタイムロス。'
  giveUp: 'ギブアップ'
  backToTop: 'トップに戻る'
  tweetGaveUp: "絶対テンポ感 Extra: かるた (難易度: {difficulty}) をギブアップ…… {'|'} タイム: {time}, とった枚数: {takenNumber} / {max}"
  tweetCleared: "絶対テンポ感 Extra: かるた (難易度: {difficulty})  をクリア！ {'|'} タイム: {time}, とった枚数: {takenNumber} / {max}"
en:
  title: Karuta
  description: 'Take a card of the same tempo as the given tempo!'
  description2: 'If you take a wrong card, you lose 3 seconds of time.'
  giveUp: 'Give Up'
  backToTop: 'Back to Top'
  tweetGaveUp: "I gave up the Karuta game (difficulty: {difficulty}) of Absolute Tempo... {'|'} Time: {time}, Taken Cards: {takenNumber} / {max}"
  tweetCleared: "I cleared the Karuta game (difficulty: {difficulty}) of Absolute Tempo! {'|'} Time: {time}, Taken Cards: {takenNumber} / {max}"
</i18n>

<style scoped lang="scss">
article {
  text-align: center;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
}
.time {
  font-family: monospace;
  margin-top: 1rem;
}
.description {
  margin-top: 0.5rem;
  font-size: smaller;
  line-height: 1.3em;
}
.question {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
}
.card-field {
  display: grid;
  gap: 2%;
  margin-bottom: 2rem;
}
.card-field-glid-3 {
  grid-template-columns: repeat(3, 1fr);
}
.card-field-glid-4 {
  grid-template-columns: repeat(4, 1fr);
}
.card-field-glid-5 {
  grid-template-columns: repeat(5, 1fr);
}
.button-area {
  margin-top: 1.3rem;
  display: flex;
  justify-content: space-around;
}
</style>
