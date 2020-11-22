const getLocalStorage = (localKey: string): string => {
  return typeof window !== 'undefined' && window
    ? JSON.parse(<string>localStorage.getItem(localKey))
    : null;
};

const isEmptyLocalStorage = (localKey: string): boolean =>
  !getLocalStorage(localKey);

export const getByLocalStorage = (localKey: string): string | any => {
  if (isEmptyLocalStorage(localKey)) return '';
  return getLocalStorage(localKey);
};

export const setByLocalStorage = (localKey: string, data: any): boolean => {
  if (!data) return false;
  localStorage.setItem(localKey, JSON.stringify(data));
  return true;
};
