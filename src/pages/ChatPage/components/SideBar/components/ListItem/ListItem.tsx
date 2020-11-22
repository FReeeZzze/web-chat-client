import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { indigo } from '@material-ui/core/colors';
import { setThemeTitleColor, setThemeColor } from 'utils/theme.utils';
import s from './ListItem.module.scss';

interface Props {
  className?: string;
  isBlack: boolean;
  name?: string;
  message: JSX.Element;
  onClick: () => void;
  time: string;
}

const useStyles = makeStyles((theme) => ({
  avatarIcon: {
    gridRow: '1/3',
    gridColumn: '1',
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  message: (isBlack: boolean) => ({
    display: 'flex',
    color: setThemeColor(isBlack),
    wordWrap: 'break-word',
    gridColumn: '2/4',
    gridRow: '2',
    fontSize: '12px',
  }),
  userName: (isBlack: boolean) => ({
    color: setThemeTitleColor(isBlack),
    fontWeight: 500,
    fontSize: '14px',
    gridColumn: '2',
    gridRow: '1',
  }),
}));

const ListItem = ({
  className,
  isBlack,
  name,
  message,
  onClick,
  time,
}: Props): JSX.Element => {
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

export default ListItem;
