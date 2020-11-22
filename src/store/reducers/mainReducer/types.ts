export const types = {
  SET_DIALOGS: 'main/SET_DIALOGS',
  SET_SELECTED_USER: 'main/SET_SELECTED_USER',
  SET_NEW_MESSAGE: 'main/SET_NEW_MESSAGE',
  SET_USERS: 'main/SET_USERS',
  SET_ME: 'main/SET_ME',
};

export interface IMessage {
  _id: string;
  from: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  _id?: string;
  dialogs?: IDialog[];
  confirmed?: boolean;
  email?: string;
  name?: string;
  password?: string;
  last_seen?: string;
  created_at?: string;
  updated_at?: string;
  username?: string;
}

export interface IDialog {
  _id: string;
  users: IUser[];
  messages: IMessage[];
  created_at: string;
  updated_at: string;
}

export interface IMainState {
  me: IUser;
  Users: IUser[];
  Dialogs: IDialog[];
  selectedUser: string;
}

export interface SetDialogsAction {
  type: typeof types.SET_DIALOGS;
  payload: IDialog[];
}

export interface SetUsersAction {
  type: typeof types.SET_USERS;
  payload: IUser[];
}

export interface SetMeAction {
  type: typeof types.SET_ME;
  payload: IUser;
}

export interface SetSelectedUser {
  type: typeof types.SET_SELECTED_USER;
  payload: string;
}

export type MainActionTypes =
  | SetDialogsAction
  | SetUsersAction
  | SetMeAction
  | SetSelectedUser;
