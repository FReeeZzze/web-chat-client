import React from 'react';
import { string } from 'prop-types';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const HeaderBar = ({ title }) => {
  const styles = useStyles();
  return (
    <>
      <Avatar className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </>
  );
};

HeaderBar.defaultProps = {
  title: '',
};

HeaderBar.propTypes = {
  title: string,
};

export default HeaderBar;
