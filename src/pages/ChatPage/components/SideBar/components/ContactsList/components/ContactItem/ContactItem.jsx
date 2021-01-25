import React from 'react';
import { string, func, oneOfType, object } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { setThemeTitleColor, setThemeColor } from 'utils/theme.utils';
import { useSelector } from 'react-redux';
import AvatarItem from 'components/AvatarItem';

const useStyles = makeStyles(() => ({
  item: {
    height: '100%',
    maxHeight: '70px',
    display: 'grid',
    gridTemplate: 'auto / 50px auto 50px',
    alignItems: 'center',
    borderBottom: '1px ridge rgba(255, 255, 255, 0.2)',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none',
    '& time': {
      textAlign: 'center',
      fontSize: '14px',
      gridColumn: '3',
      gridRow: '1',
    },
  },
  message: (props) => ({
    display: 'flex',
    color: setThemeColor(props.isBlack),
    wordWrap: 'break-word',
    gridColumn: '2/4',
    gridRow: '2',
    fontSize: '12px',
  }),
  userName: (props) => ({
    color: setThemeTitleColor(props.isBlack),
    fontWeight: 500,
    fontSize: '14px',
    gridColumn: '2',
    gridRow: '1',
  }),
}));

const ContactItem = ({ className, name, url, message, onClick, time }) => {
  const { selected } = useSelector((state) => state.theme);
  const isBlack = selected === 'black';
  const styles = useStyles({ isBlack });

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
      className={`${styles.item} ${className}`}
      onClick={onClick}
    >
      <AvatarItem name={name} url={url} />
      <span className={styles.userName}>{name}</span>
      <div className={styles.message}>{message}</div>
      <time dateTime={time}>{time}</time>
    </div>
  );
};

ContactItem.propTypes = {
  className: string,
  name: string,
  message: oneOfType([string, object]),
  onClick: func,
  time: string,
  url: string,
};

export default ContactItem;
