import { IDialog, IUser } from 'store/reducers/mainReducer/types';

const getOpponent = (item: IDialog, me?: string): IUser[] => {
  return item.users.filter((user) => {
    if (user._id !== me) return user;
    return !user;
  });
};

export default getOpponent;
