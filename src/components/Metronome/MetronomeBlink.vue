<script setup lang="ts">
import { ref, watch } from 'vue'
import MetronomeBlinkCircle from './MetronomeBlinkCircle.vue'

const props = defineProps<{
  beat: boolean
}>()
const count = ref(0)
watch(
  () => props.beat,
  (newValue) => {
    newValue && count.value++
  },
)
</script>
<template>
  <div class="container">
    <div class="box">
      <Transition>
        <MetronomeBlinkCircle v-show="count % 2 === 1 && beat" />
      </Transition>
    </div>
    <div class="box">
      <Transition>
        <MetronomeBlinkCircle v-show="count % 2 === 0 && beat" />
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
}
.box {
  aspect-ratio: 1;
  width: 50%;
  padding-left: 8%;
  padding-right: 8%;
}

.v-leave-active {
  transition: opacity 0.1s ease-out;
}

.v-leave-to {
  opacity: 0;
}
</style>
