import React from 'react';
import { string, array } from 'prop-types';
import { AuthContext } from 'context/AuthContext';
import s from './LastMessage.module.scss';

const GetLastMessage = (user, lastMessage) => {
  return !lastMessage.from.includes(user) ? (
    <>
      {lastMessage.message
        ? lastMessage.message.split('').splice(0, 58).join('')
        : 'Голосовое сообщение'}
    </>
  ) : (
    <>
      <div className={s.linkedYou}>Вы: </div>
      {lastMessage.message
        ? lastMessage.message.split('').splice(0, 58).join('')
        : 'Голосовое сообщение'}
    </>
  );
};

const LastMessage = ({ lastMessage, messages }) => {
  const auth = React.useContext(AuthContext);
  const last = messages.find((item) => lastMessage.includes(item._id));
  if (messages.length > 0 && last) {
    return GetLastMessage(auth.userId, last);
  }
  return <></>;
};

LastMessage.defaultProps = {
  messages: [],
  lastMessage: '',
};

LastMessage.propTypes = {
  lastMessage: string,
  messages: array,
};

export default LastMessage;
