import iziToast from 'izitoast';
import {
  fetchCategories,
  fetchProductByID,
  fetchProducts,
} from './products-api';
import {
  renderCategories,
  renderProducts,
  renderProductByID,
} from './render-function';
import { refs } from './refs';

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

export const productClickHandler = () => {
  refs.ulProductEl.addEventListener('click', async e => {
    const target = e.target.closest('li');
    if (!target) return;

    const id = target.dataset.id;
    if (!id) return;

    refs.modalEl.classList.add('modal--is-open');

    try {
      const productData = await fetchProductByID(id);
      renderProductByID(productData);
    } catch (err) {
      iziToast.error({ message: err.message || 'Failed to load product' });
    }
  });
  refs.modalCloseBtn.addEventListener('click', () => {
    refs.modalEl.classList.remove('modal--is-open');
    refs.modalListEl.innerHTML = '';
  });
  refs.modalEl.addEventListener('click', e => {
    if (e.target === refs.modalEl) {
      refs.modalEl.classList.remove('modal--is-open');
      refs.modalListEl.innerHTML = '';
    }
  });
};
