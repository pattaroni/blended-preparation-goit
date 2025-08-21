import iziToast from 'izitoast';
import {
  fetchCategories,
  fetchProducts,
  fetchProductByID,
  searchByValue,
} from './products-api';

import {
  renderCategories,
  renderProducts,
  renderProductByID,
  renderByValue,
} from './render-function';

import { refs } from './refs';
import {
  checkStatusSearchProduct,
  checkStatusUserValue,
} from './helpers';

let currentPage = 1;
let userValue;

// Отримати категорії
export const getCategories = async () => {
  try {
    const result = await fetchCategories();
    renderCategories(['All', ...result]);
  } catch (error) {
    iziToast.error({ message: error });
  }
};

// Отримати всі продукти
export const getProducts = async () => {
  try {
    const result = await fetchProducts(currentPage);
    renderProducts(result.products);
  } catch (err) {
    iziToast.error({ message: err });
  }
};

// Обробка сабміту пошуку
export const submitEventFunction = () => {
  refs.searchFormEl.addEventListener('submit', async e => {
    e.preventDefault();
    userValue = e.target.searchValue.value.trim();

    if (!checkStatusUserValue(userValue)) return;

    if (userValue) {
      refs.clearBtnForm.classList.add('search-form__btn-clear--visible');
    }

    try {
      const result = await searchByValue(userValue, currentPage);

      if (!checkStatusSearchProduct(result)) {
        refs.notFoundEl.classList.add('not-found--visible');
        refs.ulProductEl.innerHTML = '';
        return;
      }

      refs.notFoundEl.classList.remove('not-found--visible');
      renderByValue(result.products);
    } catch (error) {
      iziToast.error({ message: error });
    }
  });
};

// Обробка кліку по продукту
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