import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import ChatContainer from './components/ChatContainer';
import EmptyContainer from './components/EmptyContainer';
import s from './MainBlock.module.scss';

export interface IMainBlockProps {
  className?: string;
}

const MainBlock = ({ className = '' }: IMainBlockProps): JSX.Element => {
  const { selectedUser } = useSelector((state: RootState) => state.users);
  const userIsSelected: boolean = selectedUser.length > 0;
  return (
    <div className={`${s.container} ${className}`}>
      {userIsSelected ? <ChatContainer /> : <EmptyContainer />}
    </div>
  );
};

export default MainBlock;
