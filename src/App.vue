<script setup lang="ts">
import TopPage from './components/TopPage.vue'
import GameA from './components/GameA.vue'
import Result from './components/Common/GameResult.vue'
import { usePageManagerStore } from './stores/pageManager'
import { useI18n } from 'vue-i18n'
import TranslateButton from './components/TranslateButton.vue'
import GameB from './components/GameB.vue'
import GameKaruta from './components/GameKaruta.vue'

const pageManager = usePageManagerStore()
const { t } = useI18n()
</script>

<template>
  <header>
    <div class="translate-button">
      <TranslateButton />
    </div>
    <h1>{{ t('title') }}</h1>
  </header>

  <main>
    <TopPage v-if="pageManager.nowPage === 'Top'" />
    <GameA
      mode="game"
      v-if="pageManager.nowPage === 'GameA'"
    />
    <GameA
      mode="practice"
      v-if="pageManager.nowPage === 'PracticeA'"
    />
    <Result
      game-variation="A"
      v-if="pageManager.nowPage === 'ResultA'"
    />
    <GameB
      mode="game"
      v-if="pageManager.nowPage === 'GameB'"
    />
    <GameB
      mode="practice"
      v-if="pageManager.nowPage === 'PracticeB'"
    />
    <Result
      game-variation="B"
      v-if="pageManager.nowPage === 'ResultB'"
    />
    <GameKaruta v-if="pageManager.nowPage === 'GameKaruta'" />
  </main>
</template>

<i18n lang="yaml">
ja:
  title: '絶対テンポ感'
en:
  title: 'Absolute Tempo'
</i18n>

<style scoped>
header {
  line-height: 1.5;
}
h1 {
  /* display: inline; */
  margin-left: auto;
  margin-right: auto;
}
.translate-button {
  display: flex;
  justify-content: flex-end;
  padding-bottom: -1rem;
}
</style>
