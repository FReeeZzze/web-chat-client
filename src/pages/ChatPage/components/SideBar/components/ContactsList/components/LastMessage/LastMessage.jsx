import React, { useContext } from 'react';
import { object } from 'prop-types';
import getOpponent from 'utils/chat.utils';
import { AuthContext } from 'context/AuthContext';
import s from './LastMessage.module.scss';

const GetLastMessage = (user, lastMessage) => {
  return lastMessage.from === user._id ? (
    <>{lastMessage.message.split('').splice(0, 65).join('')}</>
  ) : (
    <>
      <div className={s.linkedYou}>Вы: </div>
      {lastMessage.message.split('').splice(0, 65).join('')}
    </>
  );
};

const LastMessage = ({ item }) => {
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

LastMessage.propTypes = {
  item: object,
};

export default LastMessage;
