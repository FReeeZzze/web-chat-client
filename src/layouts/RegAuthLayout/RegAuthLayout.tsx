import React, { ReactNode, useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import HeaderBar from './components/HeaderBar';
import CopyRight from './components/CopyRight';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
);

interface Props {
  children: ReactNode;
  typeReg?: boolean;
}

const RegAuthLayout = ({ children, typeReg = false }: Props): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    document.title = typeReg ? 'Зарегистрируйся' : 'Войти в чат';
  }, [typeReg]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <HeaderBar title={typeReg ? 'Регистрация' : 'Войти'} />
        {children}
      </div>
      <Box mt={8}>
        <CopyRight />
      </Box>
    </Container>
  );
};

export default RegAuthLayout;
