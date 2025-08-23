import iziToast from 'izitoast';
import { STORAGE_KEYS } from './constants.js';

const getSerializedData = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    iziToast.error({
      message: `Error retrieving data from storage: ${error.message}`,
    });
    return null;
  }
};

export const getDataFromStorage = key =>
  [STORAGE_KEYS.CART, STORAGE_KEYS.WISHLIST].includes(key)
    ? getSerializedData(key)
    : localStorage.getItem(key);

export const saveDataToStorage = (key, data) => {
  [STORAGE_KEYS.CART, STORAGE_KEYS.WISHLIST].includes(key)
    ? localStorage.setItem(key, JSON.stringify(data))
    : localStorage.setItem(key, data);
};
