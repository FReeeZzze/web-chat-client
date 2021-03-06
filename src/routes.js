import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ChatPage, LoginPage, RegisterPage } from './pages';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/chat" exact>
          <ChatPage />
        </Route>
        <Redirect to="/chat" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};

export default useRoutes;
