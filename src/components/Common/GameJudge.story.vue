<script setup lang="ts">
import type { JudgeResult } from '@/types'
import { judgeResults } from '@/types'
import { ref } from 'vue'
import GameJudge from './GameJudge.vue'
const judgeResult = ref<JudgeResult>('PERFECT')
</script>
<template>
  <Story>
    <GameJudge :judgeResult="judgeResult" />
    <template #controls>
      <VSelect
        v-model="judgeResult"
        :items="judgeResults"
      />
    </template>
  </Story>
</template>
