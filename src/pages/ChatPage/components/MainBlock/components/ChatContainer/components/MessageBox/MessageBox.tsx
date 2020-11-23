import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { AuthContext } from 'context/AuthContext';
import { IMessage } from 'store/reducers/usersReducer/types';
import MessageItem from './components/MessageItem';
import s from './MessageBox.module.scss';

interface Props {
  className?: string;
}

const MessageBox = ({ className }: Props): JSX.Element => {
  const { selectedUser, Users } = useSelector(
    (state: RootState) => state.users
  );
  const messages: IMessage[] = [
    {
      _id: '',
      from: '',
      message: '',
      created_at: '',
      updated_at: '',
    },
  ];
  const auth = useContext(AuthContext);
  const [chat, setChat] = useState(messages);

  useEffect(() => {
    for (const key of Users)
      if (key._id === selectedUser) setChat(key.dialogs?.messages);
  }, [auth.userId, Users, selectedUser]);

  return (
    <div className={`${s.messageBox} ${className}`}>
      {chat.length > 0 &&
        chat.map((item) => (
          <MessageItem
            key={item._id}
            message={item.message}
            date={item.created_at}
            isRightPosition={auth.userId !== item.from}
          />
        ))}
    </div>
  );
};

export default MessageBox;
