import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import { RootState } from 'store';
import { actions } from 'store/reducers/mainReducer/mainReducer';
import fetchDialog from 'store/thunks/dialogThunk';
import fetchUsers from 'store/thunks/usersThunk';
import useHttp from 'hooks/http.hook';
import getOpponent from 'utils/chat.utils';
import {
  setThemeActiveBG,
  setThemeBackground,
  setThemeSearchBG,
  setThemeActiveColor,
} from 'utils/theme.utils';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useInterval from 'hooks/interval.hook';
import { hour } from 'constants/time';
import ListItem from './components/ListItem';
import LastMessage from './components/LastMessage';
import { getDate } from './utils';
import s from './SideBar.module.scss';

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
  const { Dialogs, Users, selectedUser } = useSelector(
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
    dispatch(fetchUsers(request, auth.token));
  }, [auth.token, dispatch, request]);

  useInterval(() => {
    // обновить список пользователей через час
    dispatch(fetchUsers(request, auth.token));
  }, hour);

  const handleOnChange = (e) => setSearch(e.target.value);

  const FilteredUsers = Users.filter(
    (user) =>
      user.username.toLowerCase() === search.toLowerCase() ||
      user.name.toLowerCase() === search.toLowerCase()
  );

  return (
    <aside className={`${s.side} ${styles.sideTheme} ${className}`}>
      <input
        type="search"
        value={search}
        onChange={handleOnChange}
        className={`${s.search} ${styles.searchTheme}`}
        placeholder="Поиск"
      />
      <div className={s.users}>
        {Dialogs.map((item, index) => (
          <ListItem
            key={`${auth.userId} - ${index}`}
            name={getOpponent(item.users, auth.userId).name}
            message={<LastMessage item={item} />}
            time={getDate(item)}
            className={
              getOpponent(item.users, auth.userId)._id === selectedUser
                ? styles.active
                : styles.default
            }
            isBlack={isBlack}
            onClick={() =>
              dispatch(
                actions.setSelectedUser(
                  getOpponent(item.users, auth.userId)._id || auth.userId
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
