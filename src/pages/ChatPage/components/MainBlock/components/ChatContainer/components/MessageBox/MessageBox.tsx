import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import getOpponent from 'utils/chat.utils';
import { AuthContext } from 'context/AuthContext';
import { IDialog } from 'store/reducers/mainReducer/types';
import MessageItem from './components/MessageItem';
import s from './MessageBox.module.scss';

interface Props {
  className?: string;
}

const MessageBox = ({ className }: Props): JSX.Element => {
  const { selectedUser, Dialogs } = useSelector(
    (state: RootState) => state.main
  );
  const dialog: IDialog = {
    _id: '',
    messages: [],
    users: [],
    created_at: '',
    updated_at: '',
  };
  const auth = useContext(AuthContext);
  const [chat, setChat] = useState(dialog);

  useEffect(() => {
    for (const key of Dialogs)
      if (getOpponent(key.users, auth.userId)._id === selectedUser)
        setChat(key);
  }, [auth.userId, Dialogs, selectedUser]);

  return (
    <div className={`${s.messageBox} ${className}`}>
      {chat?.messages?.length > 0 &&
        chat.messages.map((item) => (
          <MessageItem
            key={item._id}
            message={item.message}
            date={item.created_at}
            isRightPosition={
              getOpponent(chat.users, auth.userId)._id !== item.from
            }
          />
        ))}
    </div>
  );
};

export default MessageBox;
