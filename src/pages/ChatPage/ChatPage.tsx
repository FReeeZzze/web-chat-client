import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, getTheme } from 'store/thunks/themeThunk';
import { RootState } from 'store';
import MainBlock from './components/MainBlock';
import SideBar from './components/SideBar';
import s from './ChatPage.module.scss';

const ChatPage = (): JSX.Element => {
  const { selected } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Чат';
  }, []);

  useEffect(() => {
    setTheme(selected);
  }, [selected]);

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

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
