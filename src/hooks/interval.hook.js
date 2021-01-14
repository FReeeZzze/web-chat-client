import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args) => savedCallback.current(...args);

    return () => {
      if (delay !== null) {
        const id = setInterval(handler, delay);
        clearInterval(id);
      }
    };
  }, [delay]);
};

export default useInterval;
