import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, getTheme } from 'store/thunks/themeThunk';
import { getCookie } from 'utils/cookiesUtils';
import { authKey, authUserId } from 'constants/cookies';
import { AuthContext } from 'context/AuthContext';
import useInterval from 'hooks/interval.hook';
import MainBlock from './components/MainBlock';
import SideBar from './components/SideBar';
import s from './ChatPage.module.scss';

const ChatPage = () => {
  const { selected } = useSelector((state) => state.theme);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Чат';
  }, []);

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  useEffect(() => {
    setTheme(selected);
  }, [selected]);

  useInterval(() => {
    const token = getCookie(authKey);
    const userId = getCookie(authUserId);
    if (!token && !userId) {
      auth.logout();
    }
  }, 1000);

  return (
    <div className={s.page}>
      <div className={`${s.background} ${s[`${selected}-background`]}`}>
        <SideBar />
        <MainBlock />
      </div>
    </div>
  );
};

export default ChatPage;
