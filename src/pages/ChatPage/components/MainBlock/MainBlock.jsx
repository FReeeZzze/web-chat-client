import React from 'react';
import { useSelector } from 'react-redux';
import ChatContainer from './components/ChatContainer';
import EmptyContainer from './components/EmptyContainer';
import s from './MainBlock.module.scss';

const MainBlock = ({ className = '' }) => {
  const { selectedContact } = useSelector((state) => state.contacts);
  const userIsSelected = Object.keys(selectedContact).length > 0;
  return (
    <div className={`${s.container} ${className}`}>
      {userIsSelected ? <ChatContainer /> : <EmptyContainer />}
    </div>
  );
};

export default MainBlock;
