import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { setThemeBackground, setThemeSearchBG } from 'utils/theme.utils';
import {
  fetchMe,
  fetchCreateDialog,
  fetchMessagesByUserId,
  findContacts,
  addContactById,
  getMyContacts,
  newMessage,
  newMessageCurrent,
} from 'store/thunks/contactsThunk';
import { AuthContext } from 'context/AuthContext';
import useHttp from 'hooks/http.hook';
import socket from 'core/socket';
import ExitButton from 'components/ExitButton';
import ContactsList from './components/ContactsList';
import s from './SideBar.module.scss';

const useStyles = makeStyles(() => ({
  sideTheme: (isBlack) => ({
    background: setThemeBackground(isBlack),
  }),
  headSide: {
    display: 'grid',
    gridGap: 5,
    gridTemplate: 'auto / 60px auto',
  },
  searchTheme: (isBlack) => ({
    background: setThemeSearchBG(isBlack),
  }),
}));

const SideBar = ({ className }) => {
  const [searchUser, setSearchUser] = React.useState('');
  const [searchContacts, setSearchContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { selected } = useSelector((state) => state.theme);
  const { selectedContact, contacts, messages, currentDialog } = useSelector(
    (state) => state.contacts
  );
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const isBlack = selected === 'black';

  const styles = useStyles(isBlack);

  React.useEffect(() => {
    dispatch(fetchMe(request, auth.token));
    dispatch(fetchMessagesByUserId(request, auth.token, auth.userId));
  }, [dispatch, request, auth]);

  React.useEffect(() => {
    dispatch(getMyContacts(request, auth.token));
  }, [dispatch, request, auth, messages]);

  const inMyContacts = (contacts, contact) => {
    if (contacts.length === 0) return false;
    return contacts.find((item) => item === contact);
  };

  React.useEffect(() => {
    const addDialog = (dialog) => {
      socket.emit('DIALOGS:JOIN', dialog._id);
    };

    const addNewMessage = (message) => {
      if (message.dialog.users.includes(auth.userId)) {
        const partner = message.dialog.users.filter(
          (item) => item !== auth.userId
        )[0];
        if (message.to === auth.userId && !inMyContacts(contacts, partner)) {
          addContactById(request, auth.token, partner).then(() => {
            dispatch(getMyContacts(request, auth.token));
          });
        }
      }
      if (message.dialog._id === currentDialog._id) {
        dispatch(newMessageCurrent(message));
        dispatch(newMessage(message));
      }
      if (message.to === auth.userId) {
        dispatch(newMessage(message));
      }
    };

    socket.on('SERVER:DIALOG_CREATED', addDialog);
    socket.on('SERVER:CURRENT_DIALOG', addDialog);
    socket.on('SERVER:NEW_MESSAGE', addNewMessage);
    return () => {
      socket.off('SERVER:DIALOG_CREATED', addDialog);
      socket.off('SERVER:CURRENT_DIALOG', addDialog);
      socket.off('SERVER:NEW_MESSAGE', addNewMessage);
    };
  }, [contacts, currentDialog, dispatch, request, auth]);

  const onSearch = () => {
    setLoading(true);
    findContacts(request, auth.token, searchUser).then((contacts) => {
      setSearchContacts(contacts);
      setLoading(false);
    });
  };

  const handleSearchClose = () => {
    setSearchContacts([]);
  };

  const handleSearchChange = (e) => {
    if (e.target.localName === 'li') {
      const contact = searchContacts
        .filter((user) => {
          for (const key of contacts) {
            if (key._id.includes(user._id)) {
              return !user;
            }
          }
          return user;
        })
        .find((user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase())
        );
      if (contact && !inMyContacts(contacts, contact)) {
        fetchCreateDialog(request, auth.token, contact).then(() => {});
        addContactById(request, auth.token, contact._id).then(() => {
          dispatch(getMyContacts(request, auth.token));
        });
      }
    }
  };

  const handleOnChange = (e) => {
    setSearchUser(e.target.value);
    onSearch();
  };

  return (
    <aside className={`${s.side} ${styles.sideTheme} ${className}`}>
      <div className={styles.headSide}>
        <ExitButton />
        <Autocomplete
          id="search-users"
          freeSolo
          onClose={handleSearchClose}
          onChange={handleSearchChange}
          options={searchContacts.map((option) => option.name)}
          loading={loading}
          className={s.auto}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleOnChange}
              className={`${s.search} ${styles.searchTheme}`}
              margin="normal"
              placeholder="Поиск"
            />
          )}
        />
      </div>
      <ContactsList
        isBlack={isBlack}
        request={request}
        token={auth.token}
        contacts={contacts}
        selectedContact={selectedContact}
        messages={messages}
      />
    </aside>
  );
};

SideBar.defaultProps = {
  className: '',
};

SideBar.propTypes = {
  className: string,
};

export default SideBar;
