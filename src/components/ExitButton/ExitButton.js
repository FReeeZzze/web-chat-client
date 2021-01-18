import React, { useContext } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from 'context/AuthContext';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  logout: {
    padding: '10px',
  },
  exitIcon: {
    fill: '#2d7fdf',
  },
}));

const ExitButton = () => {
  const auth = useContext(AuthContext);
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.logout();
    dispatch({ type: 'LOG_OUT' });
  };

  return (
    <Button className={styles.logout} onClick={handleLogout}>
      <ExitToAppIcon className={styles.exitIcon} />
    </Button>
  );
};

export default ExitButton;
