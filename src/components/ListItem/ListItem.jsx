import React from 'react';
import { string, func, oneOfType, object } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { indigo } from '@material-ui/core/colors';
import { setThemeTitleColor, setThemeColor } from 'utils/theme.utils';
import { useSelector } from 'react-redux';
import s from './ListItem.module.scss';

const useStyles = makeStyles((theme) => ({
  avatarIcon: {
    gridRow: '1/3',
    gridColumn: '1',
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  message: (isBlack) => ({
    display: 'flex',
    color: setThemeColor(isBlack),
    wordWrap: 'break-word',
    gridColumn: '2/4',
    gridRow: '2',
    fontSize: '12px',
  }),
  userName: (isBlack) => ({
    color: setThemeTitleColor(isBlack),
    fontWeight: 500,
    fontSize: '14px',
    gridColumn: '2',
    gridRow: '1',
  }),
}));

const ListItem = ({ className, name, message, onClick, time }) => {
  const { selected } = useSelector((state) => state.theme);
  const isBlack = selected === 'black';
  const classes = useStyles(isBlack);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
      className={`${s.item} ${className}`}
      onClick={onClick}
    >
      <Avatar className={classes.avatarIcon}>{name}</Avatar>
      <span className={classes.userName}>{name}</span>
      <div className={classes.message}>{message}</div>
      <time dateTime={time}>{time}</time>
    </div>
  );
};

ListItem.propTypes = {
  className: string,
  name: string,
  message: oneOfType([string, object]),
  onClick: func,
  time: string,
};

export default ListItem;
