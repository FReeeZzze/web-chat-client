import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import { RootState } from 'store';
import fetchUsers from 'store/thunks/usersThunk';
import useHttp from 'hooks/http.hook';
import { setThemeBackground, setThemeSearchBG } from 'utils/theme.utils';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useInterval from 'hooks/interval.hook';
import { hour } from 'constants/time';
import { actions } from 'store/reducers/usersReducer';
import FilteredList from './components/FilteredList';
import s from './SideBar.module.scss';

const useStyles = makeStyles(() =>
  createStyles({
    sideTheme: (isBlack: boolean) => ({
      background: setThemeBackground(isBlack),
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
  const { selected } = useSelector((state: RootState) => state.theme);
  const { searchUser } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const isBlack: boolean = selected === 'black';

  const styles = useStyles(isBlack);

  useEffect(() => {
    dispatch(fetchUsers(request, auth.token));
  }, [auth.token, dispatch, request]);

  useInterval(() => {
    // обновить список пользователей через час
    dispatch(fetchUsers(request, auth.token));
  }, hour);

  const handleOnChange = (e) => dispatch(actions.setSearchUser(e.target.value));

  return (
    <aside className={`${s.side} ${styles.sideTheme} ${className}`}>
      <input
        type="search"
        value={searchUser}
        onChange={handleOnChange}
        className={`${s.search} ${styles.searchTheme}`}
        placeholder="Поиск"
      />
      <FilteredList isSearch={!!searchUser} isBlack={isBlack} />
    </aside>
  );
};

export default SideBar;
