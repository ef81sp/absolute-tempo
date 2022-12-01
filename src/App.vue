<script setup lang="ts">
import GameA from './components/GameA.vue'
// import GameB from './components/GameB.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>絶対テンポ感</h1>
    </div>
  </header>

  <main>
    <GameA />
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

main {
  display: flex;
}
main > * + * {
  margin-left: 2rem;
}
</style>
