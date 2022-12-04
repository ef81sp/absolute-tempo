<script setup lang="ts">
import { ratings } from '@/types'
import GameAResultRating from './GameAResultRating.vue'
</script>
<template>
  <Story :layout="{ type: 'single', iframe: true }">
    <Valiant title="all">
      <GameAResultRating
        v-for="rating in ratings"
        :key="rating"
        :rating="rating"
        class="text"
      />
    </Valiant>
  </Story>
</template>
<style>
.text {
  font-size: 3.5em;
}
</style>
