import React from 'react';
import { string, bool } from 'prop-types';
import dateTimeParseToTime from 'utils/dateFormat';
import s from './MessageItem.module.scss';

const MessageItem = ({ message, date, isRightPosition }) => {
  return (
    <div
      className={`${s.message} ${
        isRightPosition ? s.yourMessage : s.hisMessage
      }`}
    >
      <span>{message}</span>
      <time dateTime={date}>{dateTimeParseToTime(date)}</time>
    </div>
  );
};

MessageItem.defaultProps = {
  message: '',
  date: '',
  isRightPosition: false,
};

MessageItem.propTypes = {
  message: string,
  date: string,
  isRightPosition: bool,
};

export default MessageItem;
