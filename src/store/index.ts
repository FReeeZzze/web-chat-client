import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const composeEnv: typeof composeWithDevTools =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const store = createStore(rootReducer, composeEnv(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
