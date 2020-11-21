import useHttp from 'hooks/http.hook';
import { actions } from 'store/reducers/mainReducer/mainReducer';

const fetchUsers = (token: string) => async (dispatch: any) => {
  const { request } = useHttp();
  try {
    const data = await request('/api/user/all', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('data: ', data);
    dispatch(actions.setUsers(data));
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchUsers;
