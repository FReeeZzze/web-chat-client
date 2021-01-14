import { actions } from 'store/reducers/themeReducer/themeReducer';
import local from 'constants/localStorage';
import { getByLocalStorage, setByLocalStorage } from 'utils/localStorage.utils';

export const setTheme = (theme) => {
  setByLocalStorage(local.keyTheme, theme);
};

export const getTheme = () => (dispatch) => {
  if (getByLocalStorage(local.keyTheme)) {
    dispatch(actions.setTheme(getByLocalStorage(local.keyTheme)));
  }
};
