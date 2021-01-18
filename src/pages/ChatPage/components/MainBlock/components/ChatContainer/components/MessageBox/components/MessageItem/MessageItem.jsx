import React from 'react';
import { string, bool, array } from 'prop-types';
import dateTimeParseToTime from 'utils/dateFormat';
import AvatarItem from 'components/AvatarItem';
import AudioItem from 'components/AudioItem';
import s from './MessageItem.module.scss';

const MessageItem = ({ message, date, name, attachments, isRightPosition }) => {
  return (
    <div
      className={`${s.message} ${
        isRightPosition ? s.yourMessage : s.hisMessage
      }`}
    >
      <AvatarItem
        name={name}
        className={isRightPosition ? s.yourAvatar : s.hisAvatar}
      />
      {attachments !== null ? (
        <AudioItem
          size={attachments[0].size}
          url={`/${attachments[0].url}`}
          date={attachments[0].date}
          duration={attachments[0].duration}
          timeEnd={attachments[0].timeEnd}
        />
      ) : (
        <div className={s.innerMessage}>
          <span>{message}</span>
          <time dateTime={date}>{dateTimeParseToTime(date)}</time>
        </div>
      )}
    </div>
  );
};

MessageItem.defaultProps = {
  name: '',
  message: '',
  date: '',
  isRightPosition: false,
  attachments: [],
};

MessageItem.propTypes = {
  attachments: array,
  name: string,
  message: string,
  date: string,
  isRightPosition: bool,
};

export default MessageItem;
