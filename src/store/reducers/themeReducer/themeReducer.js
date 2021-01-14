export const types = {
  SET_THEME: 'theme/SET_THEME',
};

const init = {
  variant: ['black', 'white'],
  selected: 'black',
};

export default function themeReducer(state = init, action) {
  const { type, payload } = action;
  if (type === types.SET_THEME) {
    return { ...state, selected: payload };
  }
  return state;
}

export const actions = {
  setTheme: (theme) => ({
    type: types.SET_THEME,
    payload: theme,
  }),
};
