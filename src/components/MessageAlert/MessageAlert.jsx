import React from 'react';
import { string, func, bool } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const MessageAlert = ({ status, onClose, isOpen, message }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
};

MessageAlert.defaultProps = {
  status: 'error',
  onClose: () => {},
  isOpen: false,
  message: '',
};

MessageAlert.propTypes = {
  status: string,
  onClose: func,
  isOpen: bool,
  message: string,
};

export default MessageAlert;
