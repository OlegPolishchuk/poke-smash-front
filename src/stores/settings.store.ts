import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CardStyle } from '@/services/constants.ts';
import { SettingsService } from '@/services/settings/settings.service.ts';

export const useSettingsStore = defineStore('settings', () => {
  const cardStyle = ref<CardStyle>(SettingsService.getCardStyle());

  function changeCardStyle(style: CardStyle) {
    cardStyle.value = style;
    SettingsService.setCardStyle(style);
  }

  function initiateStore() {
    cardStyle.value = SettingsService.getCardStyle()
  }

  return { cardStyle, changeCardStyle, initiateStore };
});
