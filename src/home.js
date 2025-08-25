import {
  getCategories,
  getProducts,
  submitEventFunction,
  productClickHandler,
  categoriesClickHandler,
  initLoadMoreHandler,
  initThemeToggle,
  restoreSelectedCategory,
  initModalHandlers,
  homeStorageRefresher,
} from './js/handlers';

import {
  clearButtonProducts,
  restoreSearchState,
  scrollToTop,
} from './js/helpers';
import { getDataFromStorage } from './js/storage.js';
import { STORAGE_KEYS } from './js/constants.js';
import { refs } from './js/refs.js';

// Логіка сторінки Home
async function initHomePage() {
  const savedWishlistProductsIds =
    getDataFromStorage(STORAGE_KEYS.WISHLIST) || [];
  const savedCartProductsIds = getDataFromStorage(STORAGE_KEYS.CART) || [];
  refs.wishlistCountEl.textContent = savedWishlistProductsIds.length;
  refs.cartCountEl.textContent = savedCartProductsIds.length;

  scrollToTop();
  await getCategories();
  await restoreSelectedCategory();
  await getProducts();
  submitEventFunction();
  clearButtonProducts();
  productClickHandler();
  categoriesClickHandler();
  initLoadMoreHandler();
  initThemeToggle();
  restoreSearchState();
  initModalHandlers();
  homeStorageRefresher();
}

initHomePage();
