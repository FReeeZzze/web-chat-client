import { types, ThemeActionTypes, IThemeState } from './types';

const init: IThemeState = {
  variant: ['black', 'white'],
  selected: 'black',
};

export default function themeReducer(
  state = init,
  action: ThemeActionTypes
): IThemeState {
  const { type, payload } = action;
  if (type === types.SET_THEME) {
    return { ...state, selected: payload };
  }
  return state;
}

export const actions = {
  setTheme: (theme: string): ThemeActionTypes => ({
    type: types.SET_THEME,
    payload: theme,
  }),
};
