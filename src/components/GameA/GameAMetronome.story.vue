<script setup lang="ts">
import GameAMetronomeBlink from './GameAMetronomeBlink.vue'
import { useMetronome } from '@/composables/metronome'

const { bpm, beat, start, stop } = useMetronome()
</script>
<template>
  <Story>
    <Variant>
      <GameAMetronomeBlink :beat="beat" />

      <template #controls>
        <HstNumber
          v-model="bpm"
          title="BPM"
          max="240"
          min="40"
        />
        <VBtn
          @click="
            () => {
              start()
            }
          "
          >start</VBtn
        >
        <VBtn
          @click="
            () => {
              stop()
            }
          "
          >stop</VBtn
        >
      </template>
    </Variant>
  </Story>
</template>
