<script setup lang="ts">
import { useGameAManagerStore } from '@/stores/gameAManager'
import { useGlobalManagerStore } from '@/stores/globalManager'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GameAResultRating from './GameAResultRating.vue'

const gameAManager = useGameAManagerStore()
const globalManager = useGlobalManagerStore()
const { t } = useI18n()

const tweetUrl = computed(() => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', t('tweet_content', { rating: gameAManager.rating }))
  url.searchParams.set('hashtags', 'absolute_tempo')
  url.searchParams.set('url', 'https://example.com')

  return url.toString()
})
</script>

<template>
  <p class="introduction">{{ t('intro') }}</p>
  <p><small>(EXCELLENT > S > A > B > C > D > E > F)</small></p>
  <p>
    <GameAResultRating
      :rating="gameAManager.rating"
      class="rating"
    />
  </p>
  <div class="button-area">
    <VBtn @click="globalManager.goToThePage('Top')">{{ t('return_to_top') }}</VBtn>
    <VBtn
      prepend-icon="mdi-twitter"
      color="#1DA1F2"
      class="tweet-button"
      :href="tweetUrl"
      >{{ t('tweet') }}</VBtn
    >
  </div>
</template>

<i18n lang="yaml">
ja:
  intro: 'あなたのレーティングは……'
  return_to_top: 'トップに戻る'
  tweet: 'ツイート'
  tweet_content: '絶対テンポ感 GAME A でレーティング【 {rating} 】を獲得！'
en:
  intro: 'Your rating is...'
  return_to_top: 'Return to Top'
  tweet: 'Tweet'
  tweet_content: 'I got a rating of [{rating}] on Absolute Tempo GAME A!'
</i18n>

<style scoped>
* {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.introduction {
  font-size: 1.1rem;
}
.rating {
  font-size: 4rem;
}
.tweet-button {
  color: white;
}
.button-area {
  display: flex;
  justify-content: space-around;
}
</style>
