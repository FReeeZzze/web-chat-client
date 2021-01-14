import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import themeReducer from './themeReducer';
import contactsReducer from './contactsReducer';

const appReducer = combineReducers({
  main: mainReducer,
  contacts: contactsReducer,
  theme: themeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
