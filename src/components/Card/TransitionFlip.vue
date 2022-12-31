<script setup lang="ts">
import { onMounted, ref, toRef, watch } from 'vue'

type Side = 'A' | 'B'

const props = defineProps<{
  side?: Side
  onClick?: Function
  disabledDefaultOnClick?: boolean
}>()
const propSide = toRef(props, 'side')
const emit = defineEmits<{
  (e: 'update:side', value: Side): void
}>()

const sideRef = ref<Side>('A')
const handleClick = () => {
  if (!props.disabledDefaultOnClick) {
    const next = sideRef.value === 'A' ? 'B' : 'A'
    emit('update:side', next)
    sideRef.value = next
  }
  props.onClick && props.onClick()
}

onMounted(() => {
  if (props.side === undefined) return
  sideRef.value = props.side
})

watch(propSide, (newSide) => {
  if (newSide === undefined) return
  sideRef.value = newSide
})
</script>

<template>
  <Transition
    @click="handleClick"
    mode="out-in"
  >
    <slot
      name="sideA"
      v-if="sideRef === 'A'"
    />
    <slot
      name="sideB"
      v-else
    />
  </Transition>
</template>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: transform 300ms;
}

.v-enter-from,
.v-leave-to {
  transform: rotateY(90deg);
}
</style>
