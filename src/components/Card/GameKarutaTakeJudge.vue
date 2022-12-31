<script setup lang="ts">
import { computed, onMounted } from 'vue'

export type TimingJudge = 'perfect' | 'fast' | 'slow'
const props = defineProps<{
  top: number
  left: number
  judge: TimingJudge
  isShow: boolean
}>()

const positionStyle = computed(() => ({
  top: `calc(${props.top}px - 2rem)`,
  left: `calc(${props.left}px - 2.5rem)`,
}))

onMounted(() => {
  console.log(props)
})
</script>

<template>
  <Transition>
    <p
      :class="props.judge"
      v-if="props.isShow"
      :style="positionStyle"
    >
      {{ props.judge.toUpperCase() }}
    </p>
  </Transition>
</template>

<style scoped lang="scss">
@mixin base($color) {
  $color-darken: darken($color, 30%);

  color: $color;
  text-shadow: 3px 3px 3px $color-darken, 3px -3px 3px $color-darken, -3px 3px 3px $color-darken,
    -3px -3px 3px $color-darken;
  position: fixed;
  // z-index: 1;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  width: 5rem;
}

.perfect {
  @include base(#ffff27);
}

.fast {
  @include base(#ffba30);
}

.slow {
  @include base(#30e7ff);
}

.v-leave-active {
  transition: all 1500ms ease-out;
}

.v-leave-to {
  transform: translateY(-3rem);
  opacity: 0;
}
</style>
