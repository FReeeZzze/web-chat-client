import React from 'react';
import RegAuthLayout from 'layouts/RegAuthLayout';
import AuthForm from './components/AuthForm';

const LoginPage = () => {
  return (
    <RegAuthLayout>
      <AuthForm />
    </RegAuthLayout>
  );
};

export default LoginPage;
