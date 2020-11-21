import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import useHttp from 'hooks/http.hook';
import useMessage from 'hooks/message.hook';
import useInterval from 'hooks/interval.hook';
import { AuthContext } from 'context/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface Props {
  className?: string;
}

const AuthForm = ({ className = '' }: Props): JSX.Element => {
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

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', form);
      showMessage(data.message, data.status);
      auth.login(data.token, data.userId);
    } catch (e) {
      showMessage(e.message);
    }
  };

  useInterval(() => {
    loginHandler().then(() => console.log('Re LOGIN после 1ч токена'));
  }, 3600000);

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

export default AuthForm;
