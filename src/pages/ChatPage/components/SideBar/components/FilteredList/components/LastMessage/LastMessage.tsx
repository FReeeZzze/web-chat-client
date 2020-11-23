import React, { useContext } from 'react';
import getOpponent from 'utils/chat.utils';
import { IDialog, IUser } from 'store/reducers/usersReducer/types';
import { AuthContext } from 'context/AuthContext';
import s from './LastMessage.module.scss';

interface Props {
  item: IDialog;
}

const GetLastMessage = (
  user: IUser,
  lastMessage: { from: string; message: string }
): JSX.Element => {
  return lastMessage.from === user._id ? (
    <>{lastMessage.message.split('').splice(0, 65).join('')}</>
  ) : (
    <>
      <div className={s.linkedYou}>Вы: </div>
      {lastMessage.message.split('').splice(0, 65).join('')}
    </>
  );
};

const LastMessage = ({ item }: Props): JSX.Element => {
  const auth = useContext(AuthContext);
  return item.messages?.length > 0 ? (
    GetLastMessage(
      getOpponent(item.users, auth.userId),
      item.messages[item.messages?.length - 1]
    )
  ) : (
    <> </>
  );
};

export default LastMessage;
