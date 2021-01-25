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

const AvatarItem = ({ name, className, url }) => {
  const color = React.useMemo(() => (url[0] === '#' ? url : 'none'), [url]);
  const classes = useStyles({ color });

  if (color === 'none') {
    return (
      <Avatar
        alt={name}
        src={url}
        className={`${classes.avatarIcon} ${className}`}
      />
    );
  }

  return (
    <Avatar className={`${classes.avatarIcon} ${className}`}>{name[0]}</Avatar>
  );
};

AvatarItem.defaultProps = {
  name: '',
  className: '',
  url: '',
};

AvatarItem.propTypes = {
  name: string,
  className: string,
  url: string,
};

export default AvatarItem;
