let storagePrex = 'yaTai';

/**
 * 设置storage前缀
 * @param prex
 */
export const setStoragePrex = (prex) => {
  storagePrex = prex;
};

export const setStorage = (key, value) => {
  localStorage.setItem(`${storagePrex}:${key}`, JSON.stringify(value));
};

export const getStorage = (key) => {
  const data = localStorage.getItem(`${storagePrex}:${key}`);
  return data ? JSON.parse(data) : null;
};

export const remove = (key) => {
  return localStorage.removeItem(`${storagePrex}:${key}`);
};

export const removeStorage = () => {
  localStorage.clear();
};
