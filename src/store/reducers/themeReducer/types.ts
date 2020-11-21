export const types = {
  SET_THEME: 'theme/SET_THEME',
};

export interface IThemeState {
  variant: Array<string>;
  selected: string;
}

export interface SetThemeAction {
  type: typeof types.SET_THEME;
  payload: string;
}

export type ThemeActionTypes = SetThemeAction;
