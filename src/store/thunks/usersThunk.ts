import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import { actions } from 'store/reducers/usersReducer';
import { UsersActionTypes, IUser } from 'store/reducers/usersReducer/types';
// import { getByLocalStorage, setByLocalStorage } from 'utils/localStorage.utils';
import local from 'constants/localStorage';

const fetchUsers = (
  request: (...params) => any,
  token: string
): ThunkAction<void, RootState, unknown, UsersActionTypes> => async (
  dispatch
) => {
  try {
    // if (!getByLocalStorage(local.usersStorage)) {
    const data = await request('/api/user/all', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    const users: IUser[] = data.result;
    // setByLocalStorage(local.usersStorage, users);
    dispatch(actions.setUsers(users));
    // }
    // dispatch(actions.setUsers(getByLocalStorage(local.usersStorage)));
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchUsers;
