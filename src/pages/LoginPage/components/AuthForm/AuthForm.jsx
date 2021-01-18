import React, { useState, useEffect, useContext } from 'react';
import { string } from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';

import useHttp from 'hooks/http.hook';
import useMessage from 'hooks/message.hook';
import { AuthContext } from 'context/AuthContext';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
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

const AuthForm = ({ className }) => {
  const classes = useStyles();
  const showMessage = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const auth = useContext(AuthContext);

  useEffect(() => {
    showMessage(error);
    clearError();
  }, [showMessage, error, clearError]);

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, status, token, userId } = await request(
        '/api/auth/login',
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Введите Email"
          id="email"
          name="email"
          placeholder="Введите email"
          autoComplete="email"
          autoFocus
          value={form.email}
          onChange={handlerChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Введите Password"
          name="password"
          type="password"
          id="password"
          placeholder="Введите пароль"
          autoComplete="current-password"
          value={form.password}
          onChange={handlerChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Запомнить"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={loginHandler}
          disabled={loading}
        >
          Войти
        </Button>
        <Grid container>
          <Grid item xs>
            <NavLink to="/" className={classes.link}>
              Забыл пароль?
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/register" className={classes.link}>
              Нет аккаунта? Зарегистрируйся!
            </NavLink>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

AuthForm.defaultProps = {
  className: '',
};

AuthForm.propTypes = {
  className: string,
};

export default AuthForm;
