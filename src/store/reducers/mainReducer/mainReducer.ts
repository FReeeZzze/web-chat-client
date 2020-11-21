import { types, IMainState, MainActionTypes, IDialog, IUser } from './types';

const init: IMainState = {
  me: {},
  Users: [],
  Dialogs: [],
  selectedUser: '',
};

export default function mainReducer(
  state = init,
  action: MainActionTypes
): IMainState {
  const { type, payload } = action;
  switch (type) {
    case types.SET_DIALOGS:
      return { ...state, Dialogs: payload as IDialog[] };
    case types.SET_SELECTED_USER:
      return { ...state, selectedUser: payload as string };
    case types.SET_ME:
      return { ...state, me: payload as IUser };
    case types.SET_USERS:
      return { ...state, Users: payload as IUser[] };
    default:
      return state;
  }
}

export const actions = {
  setMe: (me: IUser): MainActionTypes => ({ type: types.SET_ME, payload: me }),
  setUsers: (users: IUser[]): MainActionTypes => ({
    type: types.SET_USERS,
    payload: users,
  }),
  setDialogs: (dialog: IDialog[]): MainActionTypes => ({
    type: types.SET_DIALOGS,
    payload: dialog,
  }),
  setSelectedUser: (user: string): MainActionTypes => ({
    type: types.SET_SELECTED_USER,
    payload: user,
  }),
};
