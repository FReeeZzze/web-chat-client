const getLocalStorage = (localKey) => {
  return typeof window !== 'undefined' && window
    ? JSON.parse(localStorage.getItem(localKey))
    : null;
};

const isEmptyLocalStorage = (localKey) => !getLocalStorage(localKey);

export const getByLocalStorage = (localKey) => {
  if (isEmptyLocalStorage(localKey)) return '';
  return getLocalStorage(localKey);
};

export const setByLocalStorage = (localKey, data) => {
  if (!data) return false;
  localStorage.setItem(localKey, JSON.stringify(data));
  return true;
};
