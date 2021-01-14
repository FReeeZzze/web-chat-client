import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, getTheme } from 'store/thunks/themeThunk';
import MainBlock from './components/MainBlock';
import SideBar from './components/SideBar';
import s from './ChatPage.module.scss';

const ChatPage = () => {
  const { selected } = useSelector((state) => state.theme);
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
