import React, { useContext, useState } from 'react';
import { string } from 'prop-types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';
import { actions } from 'store/reducers/themeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import {
  setThemeBackground,
  setThemeColor,
  setThemeTitleColor,
} from 'utils/theme.utils';
import s from './HeadBanner.module.scss';

const useStyles = makeStyles((theme) => ({
  bannerTheme: (isBlack) => ({
    background: setThemeBackground(isBlack),
    color: setThemeColor(isBlack),
  }),
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuItem: (isBlack) => ({
    color: setThemeTitleColor(isBlack),
    '&:hover': {
      color: setThemeTitleColor(isBlack),
    },
  }),
  userInfo: (isBlack) => ({
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
}));

const HeadBanner = ({ className }) => {
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const { selectedContact } = useSelector((state) => state.contacts);
  const { variant, selected } = useSelector((state) => state.theme);

  const isBlack = selected === 'black';

  const styles = useStyles(isBlack);

  const handleLogout = () => {
    auth.logout();
    dispatch({ type: 'LOG_OUT' });
  };

  const handleOnChange = (e) => {
    dispatch(actions.setTheme(e.target.value));
  };

  return (
    <div className={`${s.banner} ${styles.bannerTheme}${className}`}>
      <div className={styles.userInfo}>{selectedContact.name}</div>
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

HeadBanner.defaultProps = {
  className: '',
};

HeadBanner.propTypes = {
  className: string,
};

export default HeadBanner;
