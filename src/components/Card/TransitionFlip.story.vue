<script setup lang="ts">
import { ref } from 'vue'
import TransitionFlip from './TransitionFlip.vue'
const side = ref<'A' | 'B'>('B')
const flipSide = () => {
  side.value = side.value === 'A' ? 'B' : 'A'
}
</script>
<template>
  <Story>
    <Variant title="no props">
      <TransitionFlip>
        <template #sideA>
          <div class="cardA">A</div>
        </template>
        <template #sideB>
          <div class="cardB">B</div>
        </template>
      </TransitionFlip>
    </Variant>

    <Variant title="props">
      <TransitionFlip v-model:side="side">
        <template #sideA>
          <div class="cardA">A</div>
        </template>
        <template #sideB>
          <div class="cardB">B</div>
        </template>
      </TransitionFlip>
      <br />
      <VBtn @click="flipSide">{{ `${side}` }}</VBtn>
    </Variant>
  </Story>
</template>
<style lang="scss">
@mixin base($color) {
  background-color: $color;
  color: invert($color);
  width: 5rem;
  height: 5rem;
  border: 1px solid #000;
}
.cardA {
  @include base(#222);
}
.cardB {
  @include base(#ddd);
}
</style>
