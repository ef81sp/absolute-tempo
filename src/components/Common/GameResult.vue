<script setup lang="ts">
import { useGameAManagerStore } from '@/stores/gameAManager'
import { useGameBManagerStore } from '@/stores/gameBManager'
import { usePageManagerStore } from '@/stores/pageManager'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GameResultRating from './GameResultRating.vue'
import TweetButton from './TweetButton.vue'

const props = defineProps<{
  gameVariation: 'A' | 'B'
}>()

const gameManager = (() => {
  switch (props.gameVariation) {
    case 'A':
      return useGameAManagerStore()
    case 'B':
      return useGameBManagerStore()
  }
})()
const pageManager = usePageManagerStore()
const { t } = useI18n()

const tweetText = computed(() =>
  t('tweet_content', {
    rating: gameManager.rating,
    gameVariation: t(`game_title_${props.gameVariation}`),
  }),
)
</script>

<template>
  <p class="introduction">{{ t('intro') }}</p>
  <p><small>(EXCELLENT > S > A > B > C > D > E > F)</small></p>
  <p>
    <GameResultRating
      :rating="gameManager.rating"
      class="rating"
    />
  </p>
  <div class="button-area">
    <VBtn @click="pageManager.goToThePage('Top')">{{ t('return_to_top') }}</VBtn>
    <TweetButton :text="tweetText" />
  </div>
</template>

<i18n lang="yaml">
ja:
  intro: 'あなたのレーティングは……'
  return_to_top: 'トップに戻る'
  tweet: 'ツイート'
  tweet_content: '絶対テンポ感 GAME {gameVariation} でレーティング【 {rating} 】を獲得！'
  game_title_A: 'A (テンポ推測)'
  game_title_B: 'B (叩き)'
en:
  intro: 'Your rating is...'
  return_to_top: 'Return to Top'
  tweet: 'Tweet'
  tweet_content: 'I got a rating of [ {rating} ] on Absolute Tempo GAME {gameVariation}!'
  game_title_A: 'A (Guess)'
  game_title_B: 'B (Beat)'
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
