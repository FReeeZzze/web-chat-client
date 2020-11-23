import { types, IMainState, MainActionTypes } from './types';

const init: IMainState = {
  data: [],
};

export default function mainReducer(
  state = init,
  action: MainActionTypes
): IMainState {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_DATA:
      return { ...state, data: payload as [] };
    default:
      return state;
  }
}

export const actions = {
  setData: (data: []): MainActionTypes => ({
    type: types.FETCH_DATA,
    payload: data,
  }),
};
