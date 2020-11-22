import { useState, useCallback } from 'react';

export interface IHttpHook {
  request: (...params) => any;
  error: string;
  loading: boolean;
  clearError: () => void;
}

const useHttp = (): IHttpHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(async (...params) => {
    // Массив параметров передаем в массив переменных,
    // это тоже самое если мы бы циклически записывали в переменные, начиная с 0 индекса для 1 параметра
    let [, , body = null, headers = {}] = params;
    const [url, method = 'GET', , ,] = params;
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers = {
          'Content-Type': 'application/json',
        };
      }

      const response = await fetch(url, {
        method,
        body,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так :(');
      }

      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);
  return { loading, request, error, clearError };
};

export default useHttp;
