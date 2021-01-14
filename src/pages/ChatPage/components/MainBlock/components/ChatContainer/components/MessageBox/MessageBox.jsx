import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import MessageItem from './components/MessageItem';
import s from './MessageBox.module.scss';

const MessageBox = ({ className }) => {
  const { currentDialog } = useSelector((state) => state.contacts);
  const auth = useContext(AuthContext);

  return (
    <div className={`${s.messageBox} ${className}`}>
      {Object.keys(currentDialog).length > 0 &&
        currentDialog.messages.map((item) => (
          <MessageItem
            key={item._id}
            message={item.message}
            date={item.created_at}
            isRightPosition={auth.userId === item.from}
          />
        ))}
    </div>
  );
};

MessageBox.defaultProps = {
  className: '',
};

MessageBox.propTypes = {
  className: string,
};

export default MessageBox;
