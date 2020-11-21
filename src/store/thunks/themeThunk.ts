import { actions } from 'store/reducers/themeReducer/themeReducer';
import { ThunkAction } from 'redux-thunk';
import { getByLocalStorage, setByLocalStorage } from 'utils/localStorageTheme';
import { SetThemeAction } from 'store/reducers/themeReducer/types';
import { RootState } from 'store';

export const setTheme = (theme: string): void => {
  setByLocalStorage(theme);
};

export const getTheme = (): ThunkAction<
  void,
  RootState,
  unknown,
  SetThemeAction
> => (dispatch) => {
  if (getByLocalStorage())
    dispatch(actions.setTheme(getByLocalStorage().localTheme));
};
