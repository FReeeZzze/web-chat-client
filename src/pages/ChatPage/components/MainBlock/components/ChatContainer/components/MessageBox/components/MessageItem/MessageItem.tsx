import React from 'react';
import dateTimeParseToTime from 'utils/dateFormat';
import s from './MessageItem.module.scss';

interface Props {
  message: string;
  date: string;
  isRightPosition: boolean;
}

const MessageItem = ({
  message = '',
  date = '',
  isRightPosition,
}: Props): JSX.Element => {
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

export default MessageItem;
