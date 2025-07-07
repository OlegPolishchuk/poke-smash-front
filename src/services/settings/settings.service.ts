import type { CardStyle } from '@/services/constants.ts';

export const SettingsService = {
  getCardStyle(): CardStyle {
    const style = localStorage.getItem('card-style');
    const defaultStyle: CardStyle = 'showdown';

    if (!style && this._isCardStyle(style)) {
      this.setCardStyle(defaultStyle);
      return defaultStyle;
    }

    return style as CardStyle;
  },

  setCardStyle(style: CardStyle) {
    localStorage.setItem('card-style', style);
  },

  _isCardStyle(style: any) {
    const validStyles: CardStyle[] = ['showdown', 'hd', '3d', 'clean'];

    return validStyles.includes(style);
  },
};
