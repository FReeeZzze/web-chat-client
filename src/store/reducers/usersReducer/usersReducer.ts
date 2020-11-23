import { types, IUsersState, UsersActionTypes, IUser } from './types';

const init: IUsersState = {
  me: {},
  Users: [],
  selectedUser: '',
  searchUser: '',
};

export default function usersReducer(
  state = init,
  action: UsersActionTypes
): IUsersState {
  const { type, payload } = action;
  switch (type) {
    case types.SET_SELECTED_USER:
      return { ...state, selectedUser: payload as string };
    case types.SET_ME:
      return { ...state, me: payload as IUser };
    case types.SET_USERS:
      return { ...state, Users: payload as IUser[] };
    case types.SET_SEARCH_USER:
      return { ...state, searchUser: payload as string };
    default:
      return state;
  }
}

export const actions = {
  setMe: (me: IUser): UsersActionTypes => ({ type: types.SET_ME, payload: me }),
  setSearchUser: (user: string): UsersActionTypes => ({
    type: types.SET_SEARCH_USER,
    payload: user,
  }),
  setUsers: (users: IUser[]): UsersActionTypes => ({
    type: types.SET_USERS,
    payload: users,
  }),
  setSelectedUser: (user: string): UsersActionTypes => ({
    type: types.SET_SELECTED_USER,
    payload: user,
  }),
};
