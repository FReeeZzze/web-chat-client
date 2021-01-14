import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { setThemeBackground, setThemeSearchBG } from 'utils/theme.utils';
import {
  findContacts,
  fetchMe,
  getMyContacts,
  clearSearchContacts,
  fetchCreateDialog,
  addContact,
  newMessage,
  addCurrentDialog,
  fetchMessages,
} from 'store/thunks/contactsThunk';
import { AuthContext } from 'context/AuthContext';
import useHttp from 'hooks/http.hook';
import socket from 'core/socket';
import ContactsList from './components/ContactsList';
import s from './SideBar.module.scss';

const useStyles = makeStyles(() => ({
  sideTheme: (isBlack) => ({
    background: setThemeBackground(isBlack),
  }),
  searchTheme: (isBlack) => ({
    background: setThemeSearchBG(isBlack),
  }),
}));

const SideBar = ({ className }) => {
  const [searchUser, setSearchUser] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { selected } = useSelector((state) => state.theme);
  const { searchContacts, selectedContact, contacts } = useSelector(
    (state) => state.contacts
  );
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const isBlack = selected === 'black';

  const styles = useStyles(isBlack);

  React.useEffect(() => {
    dispatch(getMyContacts(request, auth.token));
    dispatch(fetchMe(request, auth.token));

    const addNewMessage = (message) => {
      dispatch(newMessage(message));
    };

    const addDialog = (dialog) => {
      socket.emit('DIALOGS:JOIN', dialog._id);
      dispatch(fetchMessages(request, auth.token, dialog._id));
      dispatch(addCurrentDialog(dialog));
    };

    socket.on('SERVER:DIALOG_CREATED', addDialog);
    socket.on('SERVER:CURRENT_DIALOG', addDialog);
    socket.on('SERVER:NEW_MESSAGE', addNewMessage);
    return () => {
      socket.off('SERVER:DIALOG_CREATED', addDialog);
      socket.off('SERVER:CURRENT_DIALOG', addDialog);
      socket.off('SERVER:NEW_MESSAGE', addNewMessage);
    };
  }, [dispatch, request, auth]);

  const onSearch = () => {
    setLoading(true);
    dispatch(findContacts(request, auth.token, searchUser));
    setLoading(false);
  };

  const handleClose = () => {
    dispatch(clearSearchContacts());
  };

  const handleChange = (e) => {
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
      if (contact) {
        dispatch(addContact(request, auth.token, contact));
        fetchCreateDialog(request, auth.token, contact);
      }
    }
  };

  const handleOnChange = (e) => {
    setSearchUser(e.target.value);
    onSearch();
  };

  return (
    <aside className={`${s.side} ${styles.sideTheme} ${className}`}>
      <Autocomplete
        id="search-users"
        freeSolo
        onClose={handleClose}
        onChange={handleChange}
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
      <ContactsList
        request={request}
        token={auth.token}
        isBlack={isBlack}
        contacts={contacts}
        selectedContact={selectedContact}
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
