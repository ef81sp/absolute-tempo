<script setup lang="ts">
import { useGameAManagerStore } from '@/stores/gameAManager'
import { useGlobalManagerStore } from '@/stores/globalManager'
import GameAResultRating from './GameAResultRating.vue'

const gameAManager = useGameAManagerStore()
const globalManager = useGlobalManagerStore()
</script>

<template>
  <p>Your rating is...</p>
  <p>
    <GameAResultRating
      :rating="gameAManager.rating"
      class="rating"
    />
  </p>
  <div>
    <VBtn @click="globalManager.goToThePage('Top')">Return to Top</VBtn>
    <VBtn
      prepend-icon="mdi-twitter"
      color="#1DA1F2"
      class="tweet-button"
      :href="`https://twitter.com/intent/tweet?text=【${gameAManager.rating}】でした`"
      >Tweet</VBtn
    >
  </div>
</template>

<style scoped>
* {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.rating {
  font-size: 4em;
}
.tweet-button {
  color: white;
}
</style>
