import {
  initThemeToggle,
  buyProductsBtnHandler,
  productClickHandler,
  initModalHandlers,
} from './js/handlers.js';
import { scrollToTop } from './js/helpers.js';
import { refs } from './js/refs.js';
import { renderProducts } from './js/render-function.js';
import { fetchProductsByIDs } from './js/products-api.js';
import iziToast from 'izitoast';
import { getDataFromStorage } from './js/storage.js';
import { STORAGE_KEYS } from './js/constants.js';

scrollToTop();
initThemeToggle();
buyProductsBtnHandler();
productClickHandler();

(async function () {
  const savedWishlistProductsIds =
    getDataFromStorage(STORAGE_KEYS.WISHLIST) || [];
  const savedCartProductsIds = getDataFromStorage(STORAGE_KEYS.CART) || [];
  refs.wishlistCountEl.textContent = savedWishlistProductsIds.length;

  if (!savedCartProductsIds?.length) {
    refs.notFoundEl.classList.add('not-found--visible');
    return;
  }

  initModalHandlers();
  refs.cartCountEl.textContent = savedCartProductsIds.length;
  refs.loaderEl.classList.add('is-visible');

  try {
    const products = await fetchProductsByIDs(savedCartProductsIds);

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
