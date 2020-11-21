import { useCallback, useContext } from 'react';
import { MessageAlertContext } from 'context/MessageAlertContext';

const useMessage = (): ((message: string, status?: string) => void) => {
  const { setOpen, setMessage, setStatus } = useContext(MessageAlertContext);
  return useCallback(
    (message, status = 'error') => {
      if (message) {
        setMessage(message);
        setStatus(status);
        setOpen(true);
      }
    },
    [setMessage, setStatus, setOpen]
  );
};

export default useMessage;
