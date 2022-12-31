<script setup lang="ts">
import GameKarutaCard from './GameKarutaCard.vue'
import { useKarutaManagerStore } from '@/stores/karutaManager'
const karutaManager = useKarutaManagerStore()

const handleClick = () => {
  console.log('take')
  console.log(karutaManager.take(0))
}
</script>
<template>
  <Story>
    <GameKarutaCard
      :card="karutaManager.cards[0]"
      :handle-click="handleClick"
    />
    {{ JSON.stringify(karutaManager.cards[0]) }}
    <br />
    {{ karutaManager.targetTempo }}
    <HstNumber
      v-model="karutaManager.targetTempo"
      title="target tempo"
    />
  </Story>
</template>
