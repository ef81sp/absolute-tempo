<script setup lang="ts">
import TopPage from './components/TopPage.vue'
import GameA from './components/GameA/GameA.vue'
import ResultA from './components/GameA/GameAResult.vue'
import { useGlobalManagerStore } from './stores/globalManager'
import { useI18n } from 'vue-i18n'
import TranslateButton from './components/TranslateButton.vue'
import { onMounted } from 'vue'
// import GameB from './components/GameB.vue'

const globalManager = useGlobalManagerStore()
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
    <TopPage v-if="globalManager.nowPage === 'Top'" />
    <GameA
      mode="game"
      v-if="globalManager.nowPage === 'GameA'"
    />
    <GameA
      mode="practice"
      v-if="globalManager.nowPage === 'PracticeA'"
    />
    <ResultA v-if="globalManager.nowPage === 'ResultA'">おわり</ResultA>
    <!-- <GameB /> -->
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
