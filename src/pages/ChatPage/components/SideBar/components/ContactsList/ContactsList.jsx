import React from 'react';
import { bool, array, object, string, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { setThemeActiveBG, setThemeActiveColor } from 'utils/theme.utils';
import { useDispatch } from 'react-redux';
import ListItem from 'components/ListItem';
import { fetchCreateDialog } from 'store/thunks/contactsThunk';
import LastMessage from './components/LastMessage';
import getDate from './utils';
import s from './ContactsList.module.scss';

const useStyles = makeStyles(() => ({
  default: {
    transition: '100ms background ease-in-out',
    '&:hover': {
      transition: '100ms background ease-in-out',
      background: 'rgba(255, 255, 255, 0.1)',
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
}) => {
  const dispatch = useDispatch();
  const styles = useStyles(isBlack);

  const Messages = (item) => {
    const { dialogs } = item;
    if (dialogs.length > 0) {
      return <LastMessage item={dialogs} />;
    }
    return <></>;
  };

  const timeMessage = (item) => {
    const { dialogs } = item;
    return dialogs?.length > 0 ? getDate(dialogs) : '';
  };

  const getClassName = (item) =>
    item._id === selectedContact._id ? styles.active : styles.default;

  const handleClick = (item) => {
    dispatch(fetchCreateDialog(request, token, item));
  };

  return (
    <div className={s.list}>
      {contacts.length > 0 &&
        contacts.map((item, index) => (
          <ListItem
            key={`key:${item._id} - ${index}`}
            name={item.name}
            message={Messages(item)}
            className={getClassName(item)}
            onClick={() => handleClick(item)}
            time={timeMessage(item)}
          />
        ))}
    </div>
  );
};

ContactsList.propTypes = {
  request: func,
  token: string,
  isBlack: bool,
  selectedContact: object,
  contacts: array,
};

export default ContactsList;
