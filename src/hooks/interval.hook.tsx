import { useEffect, useRef } from 'react';

const useInterval = (callback: (...args) => void, delay: number): void => {
  const savedCallback = useRef<typeof callback>(callback);

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
