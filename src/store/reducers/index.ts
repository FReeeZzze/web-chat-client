import { combineReducers } from 'redux';

import mainReducer from './mainReducer/mainReducer';
import themeReducer from './themeReducer/themeReducer';

const appReducer = combineReducers({
  main: mainReducer,
  theme: themeReducer,
});

interface Action {
  type: string;
  payload: string;
}

const rootReducer = (state, action: Action) => {
  if (action.type === 'LOG_OUT') {
    // eslint-disable-next-line
    state = null;
  }

  return appReducer(state, action);
};

export default rootReducer;
