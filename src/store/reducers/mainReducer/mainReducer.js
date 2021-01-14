const types = {
  FETCH_DATA: 'main/FETCH_DATA',
};

const init = {
  data: [],
};

export default function mainReducer(state = init, action) {
  const { type, payload } = action;
  if (type === types.FETCH_DATA) {
    return { ...state, data: payload };
  }
  return state;
}

export const actions = {
  setData: (data) => ({
    type: types.FETCH_DATA,
    payload: data,
  }),
};
