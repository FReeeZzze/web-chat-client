import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'store/reducers/mainReducer/mainReducer';
import dateTimeParseToTime from 'utils/dateFormat';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import fetchDialog from 'store/thunks/dialogThunk';
import { AuthContext } from 'context/AuthContext';
import useHttp from 'hooks/http.hook';
import getOpponent from 'utils/chat.utils';
import {
  setThemeActiveBG,
  setThemeBackground,
  setThemeSearchBG,
  setThemeActiveColor,
} from 'utils/theme.utils';
import { RootState } from 'store';
import { IUser } from 'store/reducers/mainReducer/types';
import ListItem from './components/ListItem';
import s from './SideBar.module.scss';

const getLastMessage = (
  user: IUser,
  lastMessage: { from: string; message: string }
): string | JSX.Element => {
  return lastMessage.from === user._id ? (
    lastMessage.message.split('').splice(0, 65).join('')
  ) : (
    <>
      <div className={s.linkedYou}>Вы: </div>
      {lastMessage.message.split('').splice(0, 65).join('')}
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    sideTheme: (isBlack: boolean) => ({
      background: setThemeBackground(isBlack),
    }),
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
    active: (isBlack: boolean) => ({
      background: setThemeActiveBG(isBlack),
      '& div': {
        color: setThemeActiveColor(isBlack),
      },
      '&:focus': {
        outline: 'none',
      },
    }),
    searchTheme: (isBlack: boolean) => ({
      background: setThemeSearchBG(isBlack),
    }),
  })
);

interface Props {
  className?: string;
}

const SideBar = ({ className }: Props): JSX.Element => {
  const { Dialogs, selectedUser } = useSelector(
    (state: RootState) => state.main
  );
  const { selected } = useSelector((state: RootState) => state.theme);
  const [search, setSearch] = React.useState('');
  const dispatch = useDispatch();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const isBlack: boolean = selected === 'black';

  const styles = useStyles(isBlack);

  useEffect(() => {
    dispatch(fetchDialog(request, auth.token));
  }, []);

  const getMessage = (item) => {
    return item.messages.length > 0
      ? getLastMessage(
          getOpponent(item.users, auth.userId)[0],
          item.messages[item.messages.length - 1]
        )
      : '';
  };

  const getDate = (item) => {
    return dateTimeParseToTime(
      item.messages.length > 0
        ? item.messages[item.messages.length - 1].created_at
        : 0
    );
  };

  return (
    <aside className={`${s.side} ${styles.sideTheme} ${className}`}>
      <input
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className={`${s.search} ${styles.searchTheme}`}
        placeholder="Поиск"
      />
      <div className={s.users}>
        {Dialogs.map((item, index) => (
          <ListItem
            key={`${auth.userId} - ${index}`}
            name={getOpponent(item, auth.userId)[0].name}
            message={getMessage(item)}
            time={getDate(item)}
            className={
              getOpponent(item, auth.userId)[0]._id === selectedUser
                ? styles.active
                : styles.default
            }
            isBlack={isBlack}
            onClick={() =>
              dispatch(
                actions.setSelectedUser(
                  getOpponent(item, auth.userId)[0]._id || ''
                )
              )
            }
          />
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
