import React, { createContext, useState } from 'react';
import { node } from 'prop-types';
import MessageAlert from 'components/MessageAlert';

export const MessageAlertContext = createContext({});

const MessageAlertContextProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return null;
    setOpen(false);
    return null;
  };

  return (
    <MessageAlertContext.Provider value={{ setOpen, setMessage, setStatus }}>
      {children}
      <MessageAlert
        status={status}
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </MessageAlertContext.Provider>
  );
};

MessageAlertContextProvider.propTypes = {
  children: node,
};

export default MessageAlertContextProvider;
