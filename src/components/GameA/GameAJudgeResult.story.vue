<script setup lang="ts">
import type { JudgeResult } from '@/types'
import { judgeResults } from '@/types'
import { ref } from 'vue'
import GameAJudgeResult from './GameAJudgeResult.vue'
const judgeResult = ref<JudgeResult>('PERFECT')
</script>
<template>
  <Story>
    <GameAJudgeResult :judgeResult="judgeResult" />
    <template #controls>
      <VSelect
        v-model="judgeResult"
        :items="judgeResults"
      />
    </template>
  </Story>
</template>
