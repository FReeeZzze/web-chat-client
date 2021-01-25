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

  const getUser = (message) => {
    if (message.from.includes(me._id)) return me;
    return (
      contacts.find((contact) => contact._id.includes(message.from)) ?? {
        name: '',
        avatar: '',
      }
    );
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
            url={getUser(item)?.avatar}
            name={getUser(item)?.name}
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

export default React.memo(MessageBox);
