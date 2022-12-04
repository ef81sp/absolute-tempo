<script setup lang="ts">
import { useGlobalManagerStore } from '@/stores/globalManager'

const globalManager = useGlobalManagerStore()

const goToGameA = () => {
  globalManager.goToThePage('GameA')
}
</script>

<template>
  <div class="d-flex justify-space-around">
    <section>
      <div>
        <h2>GAME A</h2>
        <p>guess</p>
      </div>
      <div class="controllers">
        <VBtn @click="goToGameA">PLAY</VBtn>
        <VBtn disabled>PRACTICE</VBtn>
      </div>
    </section>
    <section>
      <div>
        <h2>GAME B</h2>
        <p>beat</p>
      </div>
      <div class="controllers">
        <VBtn disabled>PLAY</VBtn>
        <VBtn disabled>PRACTICE</VBtn>
      </div>
    </section>
  </div>
</template>

<style scoped>
section,
div > * {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
section > * + * {
  margin-top: 1.3rem;
}
button {
  display: block;
}
.controllers > * + * {
  margin-top: 0.5rem;
}
</style>
