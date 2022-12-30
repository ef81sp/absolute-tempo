<script setup lang="ts">
import { usePageManagerStore } from '@/stores/pageManager'
import { useI18n } from 'vue-i18n'

const pageManager = usePageManagerStore()

const goToGameA = () => {
  pageManager.goToThePage('GameA')
}
const goToPracticeA = () => {
  pageManager.goToThePage('PracticeA')
}
const goToGameB = () => {
  pageManager.goToThePage('GameB')
}
const goToPracticeB = () => {
  pageManager.goToThePage('PracticeB')
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
        <VBtn @click="goToGameB">PLAY</VBtn>
        <VBtn @click="goToPracticeB">PRACTICE</VBtn>
      </div>
    </section>
  </div>
  <footer>
    made by
    <a
      href="https://twitter.com/rik31415926"
      target="_blank"
      rel="noopener noreferer"
      >@rik</a
    >
  </footer>
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
footer {
  margin-top: 4rem;
  text-align: center;
}
button {
  display: block;
}
.controllers > * + * {
  margin-top: 0.5rem;
}
</style>
