import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Grid, TextField, Button, makeStyles } from '@material-ui/core';

import useHttp from 'hooks/http.hook';
import useMessage from 'hooks/message.hook';
import { AuthContext } from 'context/AuthContext';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#3f51b5',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const RegisterForm = ({ className }) => {
  const classes = useStyles();
  const showMessage = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const auth = React.useContext(AuthContext);

  useEffect(() => {
    showMessage(error);
    clearError();
  }, [showMessage, error, clearError]);

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, status, token, userId } = await request(
        '/api/auth/register',
        'POST',
        form
      );
      showMessage(message, status);
      auth.login(token, userId);
    } catch (e) {
      showMessage(e.message);
    }
  };

  return (
    <div className={`${className}`}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              label="Введите имя"
              required
              fullWidth
              id="name"
              placeholder="Введите ваше имя"
              autoFocus
              value={form.name}
              onChange={handlerChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Введите email"
              required
              fullWidth
              id="email"
              placeholder="Введите email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handlerChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              label="Введите пароль"
              fullWidth
              name="password"
              placeholder="Введите пароль от 6 символов"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handlerChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={registerHandler}
          disabled={loading}
        >
          Зарегистрироваться
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <NavLink to="/login" className={classes.link}>
              Есть аккаунт? Войти
            </NavLink>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

RegisterForm.defaultProps = {
  className: '',
};

RegisterForm.propTypes = {
  className: string,
};

export default RegisterForm;
