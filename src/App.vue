<script setup lang="ts">
import TopPage from './components/TopPage.vue'
import GameA from './components/GameA/GameA.vue'
import ResultA from './components/GameA/GameAResult.vue'
import { useGlobalManagerStore } from './stores/globalManager'
// import GameB from './components/GameB.vue'

const globalManager = useGlobalManagerStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>絶対テンポ感</h1>
    </div>
  </header>

  <main>
    <TopPage v-if="globalManager.nowPage === 'Top'" />
    <GameA v-if="globalManager.nowPage === 'GameA'" />
    <ResultA v-if="globalManager.nowPage === 'ResultA'">おわり</ResultA>
    <!-- <GameB /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
