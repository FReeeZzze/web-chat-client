import { blackTheme, whiteTheme } from 'constants/theme';

const setThemeTitleColor = (isBlack: boolean): string =>
  isBlack ? blackTheme.titleColor : whiteTheme.titleColor;
const setThemeBackground = (isBlack: boolean): string =>
  isBlack ? blackTheme.Background : whiteTheme.Background;
const setThemeColor = (isBlack: boolean): string =>
  isBlack ? blackTheme.color : whiteTheme.color;
const setPanelBG = (isBlack: boolean): string =>
  isBlack ? blackTheme.sendPanelBG : whiteTheme.sendPanelBG;
const setChatInput = (isBlack: boolean): string =>
  isBlack ? blackTheme.chatInput : whiteTheme.chatInput;
const setThemePlaceHolder = (isBlack: boolean): string =>
  isBlack ? blackTheme.chatPlaceHolder : whiteTheme.chatPlaceHolder;
const setThemeActiveBG = (isBlack: boolean): string =>
  isBlack ? blackTheme.activeBG : whiteTheme.activeBG;
const setThemeActiveColor = (isBlack: boolean): string =>
  isBlack ? blackTheme.activeColor : whiteTheme.activeColor;
const setThemeSearchBG = (isBlack: boolean): string =>
  isBlack ? blackTheme.searchBG : whiteTheme.searchBG;

export {
  setThemeTitleColor,
  setThemeBackground,
  setThemeColor,
  setChatInput,
  setThemePlaceHolder,
  setPanelBG,
  setThemeActiveBG,
  setThemeActiveColor,
  setThemeSearchBG,
};
