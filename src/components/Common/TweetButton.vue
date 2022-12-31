<script setup lang="ts">
import { generateTweetUrl } from '@/functions/generateTweetUrl'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  text: string
}>()
const { t } = useI18n()

const tweetUrl = computed(() => generateTweetUrl(props.text))
</script>
<template>
  <VBtn
    prepend-icon="mdi-twitter"
    color="#1DA1F2"
    class="tweet-button"
    :href="tweetUrl"
    target="_blank"
    rel="noopener norefferer"
    >{{ t('tweet') }}</VBtn
  >
</template>

<i18n lang="yaml">
ja:
  tweet: 'ツイート'
en:
  tweet: 'Tweet'
</i18n>

<style scoped>
.tweet-button {
  color: white;
}
</style>
