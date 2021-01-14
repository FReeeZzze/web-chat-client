import { useState, useEffect } from 'react';
import local from 'constants/localStorage';
import { authKey } from 'constants/cookies';
import { setCookie, deleteCookie, getCookie } from 'utils/cookiesUtils';

const storageName = local.authStorage;

const useAuth = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const login = (jwtToken, id) => {
    if (!getCookie(authKey)) {
      setCookie(authKey, jwtToken, {
        'max-age': 3600,
      });
    }
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({ userId: id }));
  };

  const logout = () => {
    setToken('');
    setUserId('');
    deleteCookie(authKey);

    localStorage.removeItem(storageName);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    const token = getCookie(authKey);
    if (data && token) {
      login(token, data.userId);
    }
  }, []);

  return { login, logout, token, userId };
};

export default useAuth;
