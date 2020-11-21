import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

interface Props {
  message: string;
  status: string;
  isOpen: boolean;
  onClose: (...params) => null;
}

const MessageAlert = ({
  status = 'error',
  onClose,
  isOpen = false,
  message = '',
}: Props): JSX.Element => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageAlert;
