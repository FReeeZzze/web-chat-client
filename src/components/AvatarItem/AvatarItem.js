import React from 'react';
import { string } from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  avatarIcon: (props) => ({
    gridRow: '1/3',
    gridColumn: '1',
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: props.color,
  }),
}));

const AvatarItem = ({ name, className }) => {
  const color = React.useMemo(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const classes = useStyles({ color });
  return (
    <Avatar className={`${classes.avatarIcon} ${className}`}>{name[0]}</Avatar>
  );
};

AvatarItem.defaultProps = {
  name: '',
  className: '',
};

AvatarItem.propTypes = {
  name: string,
  className: string,
};

export default AvatarItem;
