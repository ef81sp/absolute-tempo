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
const goToKarutaNormal = () => {
  pageManager.goToThePage('KarutaNormal')
}
const goToKarutaHard = () => {
  pageManager.goToThePage('KarutaHard')
}
const goToKarutaExtreme = () => {
  pageManager.goToThePage('KarutaExtreme')
}
const { t } = useI18n()
</script>

<template>
  <div class="sectioin-container">
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
  <div class="sectioin-container">
    <section>
      <h2>Extra: {{ t('karuta') }}</h2>
      <div class="controllers">
        <VBtn @click="goToKarutaNormal">Normal</VBtn>
        <VBtn @click="goToKarutaHard">Hard</VBtn>
        <VBtn @click="goToKarutaExtreme">Extreme</VBtn>
      </div>
    </section>
    <section>
      <h2>Extra: {{ t('memory') }}</h2>
      <div class="controllers">
        <VBtn disabled>PLAY</VBtn>
      </div>
    </section>
  </div>
  <footer>
    made by
    <a
      href="https://twitter.com/p_craft"
      target="_blank"
      rel="noopener noreferer"
      >@p_craft</a
    >
  </footer>
</template>

<i18n lang="yaml">
ja:
  guess: '推測'
  beat: '叩き'
  karuta: 'かるた'
  memory: '神経衰弱'
en:
  guess: 'Guess'
  beat: 'Beat'
  karuta: Karuta
  memory: Memory
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
  width: 6rem;
}
.sectioin-container {
  display: flex;
  justify-content: space-around;
}
.sectioin-container + .sectioin-container {
  margin-top: 2rem;
}
.controllers > * + * {
  margin-top: 0.5rem;
}
</style>
