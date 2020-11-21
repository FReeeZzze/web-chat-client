import { createContext } from 'react';
import { IAuth } from 'hooks/auth.hook';

export interface IAuthProps extends IAuth {
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthProps);
