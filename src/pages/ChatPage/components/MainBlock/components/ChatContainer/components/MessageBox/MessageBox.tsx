import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import MessageItem from './components/MessageItem';
import s from './MessageBox.module.scss';

interface Props {
  className?: string;
}

// interface RootState {
//   main: {
//     selectedUser: string;
//     Dialogs: [
//       {
//         messages: [];
//         users: [
//           {
//             _id: string;
//           }
//         ];
//       }
//     ];
//   };
// }
const MessageBox = ({ className }: Props): JSX.Element => {
  // const { selectedUser, Dialogs } = useSelector(
  //   (state: RootState) => state.main
  // );
  const [chat, setChat] = useState({
    users: [
      {
        _id: '',
      },
    ],
    messages: [
      {
        from: '',
        _id: '',
        message: '',
        created_at: '',
      },
    ],
  });

  // useEffect(() => {
  //   for (const key of Dialogs)
  //     if (key.users[1]._id === selectedUser) setChat(key);
  // }, [Dialogs, selectedUser]);

  return (
    <div className={`${s.messageBox} ${className}`}>
      {chat?.messages?.length > 0 &&
        chat.messages.map((item) => (
          <MessageItem
            key={item._id}
            message={item.message}
            date={item.created_at}
            isRightPosition={chat.users[1]._id !== item.from}
          />
        ))}
    </div>
  );
};

export default MessageBox;
