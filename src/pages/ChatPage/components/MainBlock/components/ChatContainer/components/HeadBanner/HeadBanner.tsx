import React, { useContext, useEffect, useState } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  FormControl,
  InputLabel,
  makeStyles,
  createStyles,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';
import { actions } from 'store/reducers/themeReducer/themeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import getOpponent from 'utils/chat.utils';
import {
  setThemeBackground,
  setThemeColor,
  setThemeTitleColor,
} from 'utils/theme.utils';
import { RootState } from 'store';
import s from './HeadBanner.module.scss';

const useStyles = makeStyles((theme) =>
  createStyles({
    bannerTheme: (isBlack: boolean) => ({
      background: setThemeBackground(isBlack),
      color: setThemeColor(isBlack),
    }),
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    menuItem: (isBlack: boolean) => ({
      color: setThemeTitleColor(isBlack),
      '&:hover': {
        color: setThemeTitleColor(isBlack),
      },
    }),
    userInfo: (isBlack: boolean) => ({
      color: setThemeTitleColor(isBlack),
      fontSize: '16px',
      fontWeight: 500,
      margin: '10px',
    }),
    logout: {
      padding: '10px',
    },
    exitIcon: {
      fill: '#2d7fdf',
    },
  })
);

export interface HeadBannerProps {
  className?: string;
}

const HeadBanner = ({ className = '' }: HeadBannerProps): JSX.Element => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const { Users, selectedUser } = useSelector((state: RootState) => state.main);
  const { variant, selected } = useSelector((state: RootState) => state.theme);

  const isBlack: boolean = selected === 'black';

  const styles = useStyles(isBlack);

  useEffect(() => {
    if (Users.length > 0) {
      for (const key of Users) {
        if (key._id === selectedUser) setName(key.name);
      }
    }
  }, [auth.userId, Users, selectedUser]);

  const handleLogout = () => {
    auth.logout();
    dispatch({ type: 'LOG_OUT' });
  };

  const handleOnChange = (e) => {
    dispatch(actions.setTheme(e.target.value));
  };

  return (
    <div className={`${s.banner} ${styles.bannerTheme}${className}`}>
      <div className={styles.userInfo}>{name}</div>
      <FormControl className={styles.formControl}>
        <InputLabel id="label-theme" className={styles.menuItem}>
          Тема
        </InputLabel>
        <Select
          labelId="label-theme"
          id="select-theme"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={selected}
          onChange={handleOnChange}
          className={styles.menuItem}
        >
          {variant.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button className={styles.logout} onClick={handleLogout}>
        <ExitToAppIcon className={styles.exitIcon} />
      </Button>
    </div>
  );
};

export default HeadBanner;
