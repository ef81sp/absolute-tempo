<script setup lang="ts">
import { useGlobalManagerStore } from '@/stores/globalManager'
import { useI18n } from 'vue-i18n'

const globalManager = useGlobalManagerStore()

const goToGameA = () => {
  globalManager.goToThePage('GameA')
}
const goToPracticeA = () => {
  globalManager.goToThePage('PracticeA')
}
const { t } = useI18n()
</script>

<template>
  <div class="d-flex justify-space-around">
    <section>
      <div>
        <h2>GAME A</h2>
        <p>{{ t('guess') }}</p>
      </div>
      <div class="controllers">
        <VBtn @click="goToGameA">PLAY</VBtn>
        <VBtn @click="goToPracticeA">PRACTICE</VBtn>
      </div>
    </section>
    <section>
      <div>
        <h2>GAME B</h2>
        <p>{{ t('beat') }}</p>
      </div>
      <div class="controllers">
        <VBtn disabled>PLAY</VBtn>
        <VBtn disabled>PRACTICE</VBtn>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml">
ja:
  guess: '推測'
  beat: '叩き'
en:
  guess: 'Guess'
  beat: 'Beat'
</i18n>

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
