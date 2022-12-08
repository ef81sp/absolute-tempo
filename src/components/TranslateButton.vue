<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { VList } from 'vuetify/components'

const localeName = new Map([
  ['ja', '日本語'],
  ['en', 'English'],
])
const { locale, availableLocales } = useI18n({ useScope: 'global' })
const handleClickSelect: VList['onClick:select'] = ({ id }) => {
  locale.value = id as string
}
onMounted(() => {
  switch (window.navigator.language) {
    case 'ja':
    case 'ja-JP':
      locale.value = 'ja'
      break
    default:
      locale.value = 'en'
  }
})
</script>

<template>
  <VBtn
    icon
    size="x-small"
  >
    <VIcon>mdi-translate</VIcon>
    <VMenu activator="parent">
      <VList
        v-model="locale"
        @click:select="handleClickSelect"
      >
        <VListItem
          v-for="availableLocale in (availableLocales as string[])"
          :key="`locale-${availableLocale}`"
          :value="availableLocale"
        >
          <VListItemTitle>{{ localeName.get(availableLocale) }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>
