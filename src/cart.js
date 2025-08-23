import {
  initThemeToggle,
  buyProductsBtnHandler,
  productClickHandler,
} from './js/handlers.js';
import { scrollToTop } from './js/helpers.js';
import { refs } from './js/refs.js';
import { renderProducts } from './js/render-function.js';
import { fetchProductsByIDs } from './js/products-api.js';
import iziToast from 'izitoast';

scrollToTop();
initThemeToggle();
buyProductsBtnHandler();
productClickHandler();

const savedProductsIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

(async function () {
  if (!savedProductsIds?.length) {
    refs.notFoundEl.classList.add('not-found--visible');
    return;
  }

  refs.cartCountEl.textContent = savedProductsIds.length;
  refs.productsCountEl.textContent = savedProductsIds.length;
  refs.loaderEl.classList.add('is-visible');

  try {
    const products = await fetchProductsByIDs(savedProductsIds);

    const totalPrice = products.reduce(
      (acc, product) => acc + product.price,
      0
    );
    refs.priceCountEl.textContent = `$${totalPrice.toFixed(2)}`;
    renderProducts(products);
  } catch (error) {
    iziToast.error({
      message: `Error loading products: ${error.message}`,
    });
  } finally {
    refs.loaderEl.classList.remove('is-visible');
  }
})();
