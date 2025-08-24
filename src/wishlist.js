import {
  initThemeToggle,
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
productClickHandler();

(async function () {
  const savedWishlistProductsIds =
    getDataFromStorage(STORAGE_KEYS.WISHLIST) || [];
  const savedCartProductsIds = getDataFromStorage(STORAGE_KEYS.CART) || [];
  refs.cartCountEl.textContent = savedCartProductsIds.length;

  if (!savedWishlistProductsIds?.length) {
    refs.notFoundEl.classList.add('not-found--visible');
    return;
  }

  initModalHandlers();
  refs.wishlistCountEl.textContent = savedWishlistProductsIds.length;
  refs.loaderEl.classList.add('is-visible');

  try {
    const products = await fetchProductsByIDs(savedWishlistProductsIds);

    renderProducts(products);
  } catch (error) {
    iziToast.error({
      message: `Error loading products: ${error.message}`,
    });
  } finally {
    refs.loaderEl.classList.remove('is-visible');
  }
})();
