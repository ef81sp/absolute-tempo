<script setup lang="ts">
import type { JudgeResult } from '@/types'
import { computed } from 'vue'

const props = defineProps<{ judgeResult: JudgeResult }>()
const message = computed(() => {
  switch (props.judgeResult) {
    case 'PERFECT':
      return 'PERFECT!!!'
    case 'GREAT':
      return 'GREAT!!'
    case 'GOOD':
      return 'GOOD!'
    case 'POOR':
      return 'POOR...'
    default:
      return 'BAD'
  }
})
</script>

<template>
  <p :class="judgeResult.toLowerCase()">{{ message }}</p>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
p {
  font-family: 'Staatliches', cursive;
  /* font-size: 3em; */
  padding: 0.2em;
}
.perfect {
  animation: move-right 1s linear infinite;
  background-size: 50% 100%;
  background-repeat: repeat-x;
  background-image: linear-gradient(
    90deg,
    rgba(36, 55, 111, 1) 11%,
    rgba(101, 90, 167, 1) 22%,
    rgba(133, 76, 185, 1) 33%,
    rgba(56, 144, 170, 1) 44%,
    rgba(219, 154, 105, 1) 55%,
    rgba(56, 144, 170, 1) 66%,
    rgba(133, 76, 185, 1) 77%,
    rgba(101, 90, 167, 1) 88%,
    rgba(36, 55, 111, 1)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.great {
  color: #76ff84;
  text-shadow: 3px 3px 3px #04550c, 3px -3px 3px #04550c, -3px 3px 3px #04550c, -3px -3px 3px #04550c;
}
.good {
  color: #b9ecfb;
  text-shadow: 3px 3px 3px #083c4b, 3px -3px 3px #083c4b, -3px 3px 3px #083c4b, -3px -3px 3px #083c4b;
}
.poor,
.bad {
  color: #e0e0e0;
  text-shadow: 3px 3px 3px #3c3b3b, 3px -3px 3px #3c3b3b, -3px 3px 3px #3c3b3b, -3px -3px 3px #3c3b3b;
}
@keyframes move-right {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
