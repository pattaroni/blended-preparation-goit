import axios from 'axios';
import { BASE_URL, ENDPOINTS, PER_PAGE } from './constants';

axios.defaults.baseURL = BASE_URL;

export const fetchCategories = async () => {
  const { data } = await axios.get(ENDPOINTS.CATEGORIES);
  return data;
};

export const fetchProducts = async currentPage => {
  const { data } = await axios.get(`${ENDPOINTS.PRODUCTS}`, {
    params: {
      limit: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
    },
  });
  return data;
};

export const searchByValue = async (userValue, currentPage) => {
  const { data } = await axios.get(`${ENDPOINTS.SEARCH}`, {
    params: {
      limit: PER_PAGE,
      q: userValue,
    },
  });
  return data;
};

export const fetchProductByID = async id => {
  const { data } = await axios.get(`${ENDPOINTS.PRODUCTS}/${id}`);
  return data;
};
