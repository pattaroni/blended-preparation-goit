import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import { getProducts, resetCurrentPage } from './handlers';

// Перевірка введеного значення
export const checkStatusUserValue = userValue => {
  if (!userValue) {
    iziToast.warning({ message: 'Введіть значення для пошуку' });
    return false;
  }
  return true;
};

// Перевірка результатів пошуку
export const checkStatusSearchProduct = result => {
  if (!result.products || result.products.length === 0) {
    iziToast.warning({ message: 'Нічого не знайдено' });
    return false;
  }
  return true;
};

export const clearCategoriesButtons = () => {
  refs.ulCategorEl.querySelectorAll('.categories__btn').forEach(btn => {
    btn.classList.remove('categories__btn--active');
  });
};

// Обробка кнопки очищення пошуку
export const clearButtonProducts = () => {
  refs.clearBtnForm.addEventListener('click', () => {
    refs.ulProductEl.innerHTML = '';
    refs.searchFormEl.searchValue.value = '';
    refs.clearBtnForm.classList.remove('search-form__btn-clear--visible');
    refs.notFoundEl.classList.remove('not-found--visible');
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loaderEl.classList.add('is-visible');

    clearCategoriesButtons();
    const allBtn = refs.ulCategorEl.querySelector('button');
    if (allBtn) {
      allBtn.classList.add('categories__btn--active');
    }

    resetCurrentPage();
    getProducts();
  });
};

// Кнопка прокрутки вгору
export const scrollToTop = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      refs.scrollToTopBtn.classList.add('scroll-top-btn--visible');
    } else {
      refs.scrollToTopBtn.classList.remove('scroll-top-btn--visible');
    }
  });

  refs.scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};
