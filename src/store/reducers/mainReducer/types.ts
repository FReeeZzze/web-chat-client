export const types = {
  FETCH_DATA: 'main/FETCH_DATA',
};

export interface IMainState {
  data: [];
}

export interface SetData {
  type: typeof types.FETCH_DATA;
  payload: [];
}

export type MainActionTypes = SetData;
