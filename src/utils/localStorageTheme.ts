import local from 'constants/localStorage';

const localTheme =
  typeof window !== 'undefined' && window
    ? JSON.parse(<string>localStorage.getItem(local.keyTheme))
    : null;

const isEmptyLocalStorage = () => !localTheme;

export const getByLocalStorage = (): boolean | typeof localTheme => {
  if (isEmptyLocalStorage()) return false;
  return {
    localTheme,
  };
};

export const setByLocalStorage = (data: string): boolean => {
  if (!data) return false;
  localStorage.setItem(local.keyTheme, JSON.stringify(data));
  return true;
};
