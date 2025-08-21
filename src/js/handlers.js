import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
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
let totalPages = 0;

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
    totalPages = Math.ceil(result.total / result.limit);
    if (currentPage < totalPages) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (err) {
    iziToast.error({ message: err });
  }
  refs.loadMoreBtn.addEventListener('click', async () => {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loaderEl.classList.add('is-visible');
    currentPage++;
    const result = await fetchProducts(currentPage);
    renderProducts(result.products);
    refs.loaderEl.classList.remove('is-visible');
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
  });
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
