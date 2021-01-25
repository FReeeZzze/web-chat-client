import React from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { setThemeActiveBG, setThemeActiveColor } from 'utils/theme.utils';
import { useDispatch } from 'react-redux';
import {
  addCurrentContact,
  addCurrentDialog,
  fetchCreateDialog,
  fetchMessagesByDialog,
} from 'store/thunks/contactsThunk';
import dateTimeParseToTime from 'utils/dateFormat';
import ContactItem from './components/ContactItem';
import LastMessage from './components/LastMessage';

const useStyles = makeStyles(() => ({
  list: {
    overflowY: 'auto',
    height: '100%',
    marginTop: '15px',
    position: 'relative',
  },
  default: {
    transition: '100ms background ease-in-out',
    '&:hover': {
      transition: '100ms background ease-in-out',
      background: 'rgba(112,160,217,0.06)',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  active: (isBlack) => ({
    background: setThemeActiveBG(isBlack),
    '& div': {
      color: setThemeActiveColor(isBlack),
    },
    '&:focus': {
      outline: 'none',
    },
  }),
}));

const ContactsList = ({
  isBlack,
  contacts,
  request,
  token,
  selectedContact,
  messages,
}) => {
  const dispatch = useDispatch();
  const styles = useStyles(isBlack);

  React.useEffect(() => {
    // update selected contact if he exists
    if (Object.keys(selectedContact).length > 0) {
      const current = contacts.find((item) => item._id === selectedContact._id);
      dispatch(addCurrentContact(current));
    }
  }, [dispatch, contacts, selectedContact]);

  const timeMessage = ({ dialog }) => {
    if (dialog) {
      const messagesFromDialog = messages.filter((message) =>
        message.dialog._id.includes(dialog._id)
      );
      const exists = messagesFromDialog.length > 0;
      const lastMessage = messagesFromDialog.length - 1;
      return exists
        ? dateTimeParseToTime(messagesFromDialog[lastMessage].createdAt)
        : '';
    }
    return '';
  };

  const getClassName = (contact) =>
    contact._id === selectedContact._id ? styles.active : styles.default;

  const handleClick = (contact) => {
    // this function create dialog or if dialog have, get current
    fetchCreateDialog(request, token, contact._id).then((result) => {
      dispatch(addCurrentDialog(result));
      dispatch(fetchMessagesByDialog(request, token, result._id));
    });
    dispatch(addCurrentContact(contact));
  };

  const getMessage = ({ dialog }) => {
    if (dialog) {
      const { lastMessage } = dialog;
      return <LastMessage lastMessage={lastMessage} messages={messages} />;
    }
    return <></>;
  };

  return (
    <div className={styles.list}>
      {contacts.length > 0 &&
        contacts.map((contact, index) => (
          <ContactItem
            key={`key:${contact._id} - ${index}`}
            name={contact.name}
            url={contact.avatar}
            message={getMessage(contact)}
            className={getClassName(contact)}
            onClick={() => handleClick(contact)}
            time={timeMessage(contact)}
          />
        ))}
    </div>
  );
};

ContactsList.propTypes = {
  messages: [],
};

ContactsList.propTypes = {
  messages: array,
  request: func,
  token: string,
  isBlack: bool,
  selectedContact: object,
  contacts: array,
};

export default React.memo(ContactsList);
