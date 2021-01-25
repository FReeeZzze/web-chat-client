import React from 'react';
import { string, bool } from 'prop-types';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  delivered: {
    color: '#819EA7',
    marginLeft: 5,
    display: 'flex',
    alignSelf: 'flex-end',
  },
}));

const DeliveredMessage = ({ className, delivered }) => {
  const styles = useStyles();
  return (
    <div className={`${styles.delivered} ${className}`}>
      {delivered && <DoneAllIcon fontSize="small" />}
      {!delivered && <DoneIcon fontSize="small" />}
    </div>
  );
};

DeliveredMessage.defaultProps = {
  className: '',
  delivered: false,
};

DeliveredMessage.propTypes = {
  className: string,
  delivered: bool,
};

export default DeliveredMessage;
