import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import MessageAlert from 'components/MessageAlert';

export interface IMessageProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
}

export const MessageAlertContext = createContext({} as IMessageProps);

const MessageAlertContextProvider: React.FC = ({ children }) => {
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

export default MessageAlertContextProvider;
