import { useCallback, useState, useEffect } from 'react';
import local from 'constants/localStorage';

const storageName = local.authStorage;

export interface IAuth {
  login: (jwtToken, id) => void;
  logout: () => void;
  token: string;
  userId: string;
}

const useAuth = (): IAuth => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setUserId('');

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) as string);
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};

export default useAuth;
