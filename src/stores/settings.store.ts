import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CardStyle } from '@/services/constants.ts';

export const useSettingsStore = defineStore('settings', () => {
  const cardStyle = ref<CardStyle>('showdown');

  function changeCardStyle(style: CardStyle) {
    cardStyle.value = style;
  }

  return { cardStyle, changeCardStyle };
});
