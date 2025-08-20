import iziToast from 'izitoast';
import { fetchCategories, fetchProducts } from './products-api';
import { renderCategories, renderProducts } from './render-function';

let currentPage = 1;

//всі функції обробники
export const getCategories = async () => {
  try {
    const dataProducts = await fetchCategories();
    renderCategories(['All', ...dataProducts]);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const result = await fetchProducts(currentPage);
    renderProducts(result.products);
  } catch (err) {
    iziToast.error({ message: err });
  }
};
