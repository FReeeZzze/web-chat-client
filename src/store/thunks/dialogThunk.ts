import { actions } from 'store/reducers/mainReducer/mainReducer';
import { ThunkAction } from 'redux-thunk';
import { MainActionTypes, IDialog } from 'store/reducers/mainReducer/types';
import { RootState } from 'store';

const fetchDialog = (
  request: (...params) => any,
  token: string
): ThunkAction<void, RootState, unknown, MainActionTypes> => async (
  dispatch
) => {
  try {
    const data = await request('/api/dialog', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    const dialogs: IDialog[] = data.dialogs;
    dispatch(actions.setDialogs(dialogs));
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchDialog;
