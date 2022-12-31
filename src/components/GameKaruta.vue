<script setup lang="ts">
import { useKarutaManagerStore } from '@/stores/karutaManager'
import { usePageManagerStore } from '@/stores/pageManager'
import { useDateFormat, useTimestamp } from '@vueuse/core'
import { computed, onMounted, ref, toRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import GameKarutaCard from './Card/GameKarutaCard.vue'
import TweetButton from './Common/TweetButton.vue'

const { t } = useI18n()

const karutaManager = useKarutaManagerStore()
const pageManager = usePageManagerStore()

onMounted(() => {
  karutaManager.init()
})

const { timestamp, pause: timestampPause } = useTimestamp({ controls: true })

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

const gaveUp = ref(false)
const giveUp = () => {
  gaveUp.value = true
  timestampPause()
}

const tweetText = computed(() =>
  t(gaveUp.value ? 'tweetGaveUp' : 'tweetCleared', {
    time: elapsedTime.value,
    takenNumber: karutaManager.takenNumber,
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
    <div class="card-field">
      <GameKarutaCard
        v-for="card in karutaManager.cards"
        :key="card.id"
        :card="card"
        :handle-click="
          () => {
            if (wrong) return
            if (card.cleared) return
            checkWrong(karutaManager.take(card.id))
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
</template>

<i18n lang="yaml">
ja:
  title: かるた
  description: '指定されたテンポと同じテンポのカードを取ろう！'
  description2: 'お手つきは3秒のタイムロス。'
  giveUp: 'ギブアップ'
  backToTop: 'トップに戻る'
  tweetGaveUp: "絶対テンポ感 Extra: かるた をギブアップ…… {'|'} タイム: {time}, とった枚数: {takenNumber} / 9"
  tweetCleared: "絶対テンポ感 Extra: かるた をクリア！ {'|'} タイム: {time}, とった枚数: {takenNumber} / 9"
en:
  title: Karuta
  description: 'Take a card of the same tempo as the given tempo!'
  description2: 'If you take a wrong card, you lose 3 seconds of time.'
  giveUp: 'Give Up'
  backToTop: 'Back to Top'
  tweetGaveUp: "I gave up the Karuta game of Absolute Tempo... {'|'} Time: {time}, Taken Cards: {takenNumber} / 9"
  tweetCleared: "I cleared the Karuta game of Absolute Tempo! {'|'} Time: {time}, Taken Cards: {takenNumber} / 9"
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
  margin-bottom: 2rem;
}
.button-area {
  margin-top: 1.3rem;
  display: flex;
  justify-content: space-around;
}
</style>
