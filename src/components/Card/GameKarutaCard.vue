<script setup lang="ts">
import type { Card } from '@/stores/karutaManager'

import { onMounted, watch } from 'vue'
import { watchOnce } from '@vueuse/core'
import TransitionFlip from './TransitionFlip.vue'
import MetronomeBlink from '../Metronome/MetronomeBlink.vue'
import { useMetronome } from '@/composables/metronome'

const props = defineProps<{
  card: Card
  handleClick: Function
  disabled?: boolean
}>()

const { beat, bpm, start, stop } = useMetronome()

onMounted(() => {
  bpm.value = props.card.bpm
  start()
})
watch(
  () => props.card.bpm,
  (newBpm) => {
    stop()
    bpm.value = newBpm
    start()
  },
)

const handleClick = (e: Event) => {
  e.stopPropagation()
  props.handleClick()
}
watchOnce(
  () => props.card.cleared,
  (newCleared) => {
    if (newCleared === true) {
      stop()
    }
  },
)
</script>

<template>
  <div @click="handleClick">
    <TransitionFlip
      :side="props.card.cleared ? 'B' : 'A'"
      :disabledDefaultOnClick="true"
    >
      <template #sideA>
        <div
          class="card"
          :class="props.disabled ? 'card-disabled' : 'card-normal'"
        >
          <MetronomeBlink
            :beat="beat"
            class="metronome"
          />
          <!-- <p>{{ card.bpm }}</p> -->
        </div>
      </template>
      <template #sideB>
        <div class="card card-reversed">
          <span class="done">✅</span>
        </div>
      </template>
    </TransitionFlip>
  </div>
</template>

<style scoped lang="scss">
.card {
  aspect-ratio: 1;
  // width: 10rem;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-normal {
  cursor: pointer;
}
.card-disabled {
  cursor: not-allowed;
  background-color: #888;
}
.card-reversed {
  cursor: default;
}
.metronome {
  margin-left: auto;
  margin-right: auto;
  width: 95%;
}
.done {
  font-size: 2rem;
}
</style>
