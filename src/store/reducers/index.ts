import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import themeReducer from './themeReducer';
import usersReducer from './usersReducer';

const appReducer = combineReducers({
  main: mainReducer,
  users: usersReducer,
  theme: themeReducer,
});

interface Action {
  type: string;
  payload: any;
}

const rootReducer = (
  state: ReturnType<typeof rootReducer>,
  action: Action
): ReturnType<typeof rootReducer> => {
  if (action.type === 'LOG_OUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
