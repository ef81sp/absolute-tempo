<script lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { onMounted, ref, watch } from 'vue'
</script>
<script setup lang="ts">
import { useMetronomeStore } from '@/stores/metronome'

const metronome = useMetronomeStore()
const swingAnimation = ref(anime({}))
const beatAnimation = ref(anime({}))

const initAnime = (duration: number) => {
  beatAnimation.value = anime({
    targets: '#beat-point',
    fill: 'rgba(255, 255, 0, 0)',
    easing: 'easeOutQuad',
    duration: 300,
    autoplay: false,
    loop: false,
    complete: () => {
      anime.set('#beat-point', {
        fill: '#ddd',
      })
    },
  })
  const path = anime.path('#path')
  swingAnimation.value = anime({
    targets: '#circle',
    translateX: path('x'),
    translateY: path('y'),
    easing: 'easeInOutQuart',
    direction: 'alternate',
    duration,
    loop: true,
    autoplay: false,
    update: function (anim) {
      if (49 <= anim.progress && anim.progress <= 51) {
        anime.set('#circle', {
          fill: '#00f',
        })
        beatAnimation.value.restart()
      } else {
        anime.set('#circle', {
          fill: '#0f0',
        })
      }
    },
  })
}
onMounted(() => {
  initAnime(1000)
})
watch(metronome.internalValues, (newValues) => {
  initAnime(newValues.intervalMs)
  if (anime.running.length > 0) {
    swingAnimation.value.restart()
  }
})
</script>
<template>
  <div class="box">
    <div>
      <VSlider
        max="240"
        min="40"
        step="4"
        v-model="metronome.bpm"
        thumb-label="always"
      />
      <VBtn @click="swingAnimation.play">start</VBtn>
      <VBtn @click="swingAnimation.pause">stop</VBtn>
    </div>
    <div class="balls">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 80 80"
      >
        <path
          d="m 5,5 q 30,50 55,0"
          fill="none"
          stroke="#666"
          id="path"
        />
        <circle
          cx="34"
          cy="30"
          r="5"
          fill="#ddd"
        />
        <circle
          cx="34"
          cy="30"
          r="5"
          fill="#ddd"
          id="beat-point"
        />
        <circle
          cx="0"
          cy="0"
          r="4"
          fill="#0f0"
          id="circle"
        />
      </svg>
    </div>
  </div>
</template>
<style scoped>
.box {
  aspect-ratio: 4/3;
  border: 1px solid #ddd;
  padding: 3rem;
}
.balls {
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: inherit;
}
</style>
