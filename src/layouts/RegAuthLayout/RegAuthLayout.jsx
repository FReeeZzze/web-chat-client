import React, { useEffect } from 'react';
import { node, bool } from 'prop-types';
import { Box, Container, CssBaseline, makeStyles } from '@material-ui/core';
import HeaderBar from './components/HeaderBar';
import CopyRight from './components/CopyRight';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const RegAuthLayout = ({ children, typeReg }) => {
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

RegAuthLayout.defaultsProps = {
  typeReg: false,
};

RegAuthLayout.propTypes = {
  children: node,
  typeReg: bool,
};

export default RegAuthLayout;
