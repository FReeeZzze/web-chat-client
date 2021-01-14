import { blackTheme, whiteTheme } from 'constants/theme';

const setThemeTitleColor = (isBlack) =>
  isBlack ? blackTheme.titleColor : whiteTheme.titleColor;
const setThemeBackground = (isBlack) =>
  isBlack ? blackTheme.Background : whiteTheme.Background;
const setThemeColor = (isBlack) =>
  isBlack ? blackTheme.color : whiteTheme.color;
const setPanelBG = (isBlack) =>
  isBlack ? blackTheme.sendPanelBG : whiteTheme.sendPanelBG;
const setChatInput = (isBlack) =>
  isBlack ? blackTheme.chatInput : whiteTheme.chatInput;
const setThemePlaceHolder = (isBlack) =>
  isBlack ? blackTheme.chatPlaceHolder : whiteTheme.chatPlaceHolder;
const setThemeActiveBG = (isBlack) =>
  isBlack ? blackTheme.activeBG : whiteTheme.activeBG;
const setThemeActiveColor = (isBlack) =>
  isBlack ? blackTheme.activeColor : whiteTheme.activeColor;
const setThemeSearchBG = (isBlack) =>
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
