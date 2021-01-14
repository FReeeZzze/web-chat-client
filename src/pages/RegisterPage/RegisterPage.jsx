import React from 'react';
import RegAuthLayout from 'layouts/RegAuthLayout';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <RegAuthLayout typeReg>
      <RegisterForm />
    </RegAuthLayout>
  );
};

export default RegisterPage;
