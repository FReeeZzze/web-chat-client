import React from 'react';
import {
  Avatar,
  makeStyles,
  Typography,
  createStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

interface Props {
  title?: string;
}

const HeaderBar = ({ title }: Props): JSX.Element => {
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

export default HeaderBar;
