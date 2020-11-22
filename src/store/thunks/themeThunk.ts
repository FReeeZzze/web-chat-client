import { actions } from 'store/reducers/themeReducer/themeReducer';
import { ThunkAction } from 'redux-thunk';
import local from 'constants/localStorage';
import { getByLocalStorage, setByLocalStorage } from 'utils/localStorage.utils';
import { SetThemeAction } from 'store/reducers/themeReducer/types';
import { RootState } from 'store';

export const setTheme = (theme: string): void => {
  setByLocalStorage(local.keyTheme, theme);
};

export const getTheme = (): ThunkAction<
  void,
  RootState,
  unknown,
  SetThemeAction
> => (dispatch) => {
  if (getByLocalStorage(local.keyTheme)) {
    dispatch(actions.setTheme(getByLocalStorage(local.keyTheme)));
  }
};
