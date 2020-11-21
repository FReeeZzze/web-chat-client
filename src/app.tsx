import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import useRoutes from 'routes';
import store from 'store';
import { AuthContext } from 'context/AuthContext';
import MessageAlertContextProvider from 'context/MessageAlertContext';
import useAuth from 'hooks/auth.hook';
import BaseLayout from './layouts/BaseLayout';

const App = (): JSX.Element => {
  const { token, login, logout, userId } = useAuth();
  // приводим строку к boolean c помощью '!!'
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated }}
      >
        <MessageAlertContextProvider>
          <Router>
            <BaseLayout>{routes}</BaseLayout>
          </Router>
        </MessageAlertContextProvider>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
