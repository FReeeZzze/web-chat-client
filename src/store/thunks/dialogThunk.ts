import { actions } from 'store/reducers/mainReducer/mainReducer';

interface ResponseData {
  dialogs: [];
}

const fetchDialog = (request: any, token: string) => async (dispatch: any) => {
  try {
    const data: ResponseData = await request('/api/dialog', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(actions.setDialogs(data.dialogs));
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchDialog;
