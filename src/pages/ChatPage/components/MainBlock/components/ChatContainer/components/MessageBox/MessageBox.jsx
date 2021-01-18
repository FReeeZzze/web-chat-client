import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import MessageItem from './components/MessageItem';
import s from './MessageBox.module.scss';

const MessageBox = ({ className }) => {
  const {
    currentDialog,
    contacts,
    me,
    messages,
    selectedContact,
  } = useSelector((state) => state.contacts);
  const auth = useContext(AuthContext);

  const messageRef = React.useRef({});

  const getNameUser = (it) => {
    if (it.from === me._id) return me.name;
    return contacts.find((item) => item._id.includes(it.from))?.name ?? '';
  };

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (Object.keys(selectedContact).length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 1000);
    }
  }, [selectedContact]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`${s.messageBox} ${className}`}>
      {Object.keys(currentDialog).length > 0 &&
        currentDialog.messages.map((item) => (
          <MessageItem
            key={item._id}
            attachments={item.attachments}
            message={item.message}
            date={item.createdAt}
            name={getNameUser(item)}
            isRightPosition={auth.userId === item.from}
          />
        ))}
      <div ref={messageRef} />
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
