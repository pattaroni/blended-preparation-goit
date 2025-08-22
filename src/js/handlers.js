import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  fetchCategories,
  fetchProducts,
  fetchProductByID,
  searchByValue,
  fetchProductsByCategory,
} from './products-api';

import {
  renderCategories,
  renderProducts,
  renderProductByID,
  renderByValue,
} from './render-function';
import { CONTENT_TYPES } from './constants';

import { refs } from './refs';
import {
  checkStatusSearchProduct,
  checkStatusUserValue,
  clearCategoriesButtons,
} from './helpers';

let currentPage = 1;
let userValue;
let totalPages = 0;
let selectedCategory = '';
let isCategoriesLoading = false;
let contentType = CONTENT_TYPES.COMMON;

export const resetCurrentPage = () => {
  currentPage = 1;
};

// Отримати категорії
export const getCategories = async () => {
  try {
    const result = await fetchCategories();
    renderCategories(['All', ...result]);

    const allBtn = refs.ulCategorEl.querySelector('button');
    if (allBtn) {
      allBtn.classList.add('categories__btn--active');
      selectedCategory = 'All';
    }
  } catch (error) {
    iziToast.error({ message: error });
  }
};

// Отримати всі продукти
export const getProducts = async () => {
  if (!selectedCategory) {
    selectedCategory = 'All';
    contentType = CONTENT_TYPES.COMMON;
    clearCategoriesButtons();
    const allBtn = refs.ulCategorEl.querySelector('button');
    if (allBtn) allBtn.classList.add('categories__btn--active');
  }

  try {
    const result = await fetchProducts(currentPage);
    renderProducts(result.products);
    totalPages = Math.ceil(result.total / result.limit);

    if (currentPage < totalPages) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (err) {
    iziToast.error({ message: err });
  }
};

export const initLoadMoreHandler = () => {
  refs.loadMoreBtn.addEventListener('click', async () => {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loaderEl.classList.add('is-visible');
    currentPage++;
    let result;

    if (selectedCategory) {
      isCategoriesLoading = true;
    }

    try {
      if (contentType === CONTENT_TYPES.COMMON) {
        result = await fetchProducts(currentPage);
      } else if (contentType === CONTENT_TYPES.PRODUCTS_BY_CATEGORY) {
        result = await fetchProductsByCategory(selectedCategory, currentPage);
      } else if (contentType === CONTENT_TYPES.SEARCH) {
        result = await searchByValue(userValue, currentPage);
      }
      renderProducts(result.products);

      refs.loadMoreBtn.classList.remove('is-hidden');

      const card = document.querySelector('.products__item');
      if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
      if (currentPage >= totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'bottomCenter',
        });
      }
    } catch (error) {
      iziToast.error({
        message: error.message || 'Failed to load products',
      });
    } finally {
      isCategoriesLoading = false;
      refs.loaderEl.classList.remove('is-visible');
    }
  });
};

// Обробка сабміту пошуку
export const submitEventFunction = () => {
  refs.searchFormEl.addEventListener('submit', async e => {
    e.preventDefault();
    userValue = e.target.searchValue.value.trim();

    if (!checkStatusUserValue(userValue)) return;

    if (userValue) {
      refs.clearBtnForm.classList.add('search-form__btn-clear--visible');
      contentType = CONTENT_TYPES.SEARCH;
      selectedCategory = '';
      clearCategoriesButtons();
    }

    currentPage = 1;

    try {
      const result = await searchByValue(userValue, currentPage);

      if (!checkStatusSearchProduct(result)) {
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.notFoundEl.classList.add('not-found--visible');
        refs.ulProductEl.innerHTML = '';
        return;
      }

      refs.notFoundEl.classList.remove('not-found--visible');
      renderByValue(result.products);

      totalPages = Math.ceil(result.total / result.limit);
      if (currentPage < totalPages) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      } else {
        refs.loadMoreBtn.classList.add('is-hidden');
      }
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

export const categoriesClickHandler = () => {
  refs.ulCategorEl.addEventListener('click', async e => {
    if (e.target.nodeName !== 'BUTTON' || isCategoriesLoading) {
      return;
    }

    selectedCategory = e.target.textContent;

    refs.ulProductEl.innerHTML = '';
    refs.notFoundEl.classList.remove('not-found--visible');
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loaderEl.classList.add('is-visible');
    refs.clearBtnForm.classList.remove('search-form__btn-clear--visible');

    userValue = '';
    refs.searchFormEl.reset();
    clearCategoriesButtons();
    e.target.classList.add('categories__btn--active');

    currentPage = 1;
    let result;
    isCategoriesLoading = true;

    try {
      if (selectedCategory === 'All') {
        contentType = CONTENT_TYPES.COMMON;
        result = await fetchProducts(currentPage);
      } else {
        contentType = CONTENT_TYPES.PRODUCTS_BY_CATEGORY;
        result = await fetchProductsByCategory(selectedCategory, currentPage);
      }

      renderProducts(result.products);
      totalPages = Math.ceil(result.total / result.limit);

      if (currentPage < totalPages) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      } else {
        refs.loadMoreBtn.classList.add('is-hidden');
      }

      if (!result.products.length) {
        refs.notFoundEl.classList.add('not-found--visible');
      }
    } catch (error) {
      iziToast.error({
        message: error.message || 'Failed to load category products',
      });
    } finally {
      isCategoriesLoading = false;
      refs.loaderEl.classList.remove('is-visible');
    }
  });
};
