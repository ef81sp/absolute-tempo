<script setup lang="ts">
import type { Rating } from '@/types'

const props = defineProps<{ rating: Rating }>()
</script>

<template>
  <span :class="props.rating.toLowerCase()">{{ props.rating }}</span>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
span {
  font-family: 'Staatliches', cursive;
  /* font-size: 3em; */
  padding: 0.2em;
}
.excellent {
  animation: move-right 1s linear infinite;
  background-size: 50% 100%;
  background-repeat: repeat-x;
  background-image: linear-gradient(
    90deg,
    rgba(36, 55, 111, 1) 11%,
    rgba(101, 90, 167, 1) 22%,
    rgba(133, 76, 185, 1) 33%,
    rgba(56, 144, 170, 1) 44%,
    rgba(219, 154, 105, 1) 55%,
    rgba(56, 144, 170, 1) 66%,
    rgba(133, 76, 185, 1) 77%,
    rgba(101, 90, 167, 1) 88%,
    rgba(36, 55, 111, 1)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@mixin base($color) {
  $color-darken: darken($color, 30%);

  color: $color;
  text-shadow: 3px 3px 3px $color-darken, 3px -3px 3px $color-darken, -3px 3px 3px $color-darken,
    -3px -3px 3px $color-darken;
}
.s {
  @include base(#ffff27);
}
.a {
  @include base(#ffba30);
}
.b {
  @include base(#ff9e30);
}
.c {
  @include base(#30e7ff);
}
.d {
  @include base(#62c880);
}
.e {
  @include base(#e0e0e0);
}
.f {
  @include base(#ff8181);
}

@keyframes move-right {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
