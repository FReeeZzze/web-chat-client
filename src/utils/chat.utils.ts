import { IUser } from 'store/reducers/mainReducer/types';

const getOpponent = (users: IUser[], me?: string): IUser => {
  return users.filter((user) => {
    if (user._id !== me) return user;
    return !user;
  })[0];
};

export default getOpponent;
