import React from 'react';
import HeadBanner from './components/HeadBanner';
import MessageBox from './components/MessageBox';
import SendPanel from './components/SendPanel';

const ChatContainer = (): JSX.Element => {
  return (
    <>
      <HeadBanner />
      <MessageBox />
      <SendPanel />
    </>
  );
};

export default ChatContainer;
