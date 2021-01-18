import React, { useState } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { actions } from 'store/reducers/themeReducer';
import {
  setThemeBackground,
  setThemeColor,
  setThemeTitleColor,
} from 'utils/theme.utils';
import dateTimeParseToTime from 'utils/dateFormat';
import ExitButton from 'components/ExitButton';
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
    '& svg': {
      color: setThemeColor(isBlack),
    },
  }),
  userInfo: (isBlack) => ({
    display: 'grid',
    color: setThemeTitleColor(isBlack),
    margin: '10px',
    '& span': {
      fontSize: '16px',
      fontWeight: 500,
    },
    '& time': {
      fontSize: '14px',
    },
  }),
}));

const HeadBanner = ({ className }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { selectedContact } = useSelector((state) => state.contacts);
  const { variant, selected } = useSelector((state) => state.theme);

  const isBlack = selected === 'black';

  const styles = useStyles(isBlack);

  const handleOnChange = (e) => {
    dispatch(actions.setTheme(e.target.value));
  };

  return (
    <div className={`${s.banner} ${styles.bannerTheme}${className}`}>
      <div className={styles.userInfo}>
        <span>{selectedContact.name}</span>
        <time dateTime={selectedContact.last_seen}>
          Последний визит: {dateTimeParseToTime(selectedContact.last_seen)}
        </time>
      </div>
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
      <ExitButton />
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
