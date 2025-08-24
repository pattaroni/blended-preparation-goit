import {
  getCategories,
  getProducts,
  submitEventFunction,
  productClickHandler,
  categoriesClickHandler,
  initLoadMoreHandler,
  initThemeToggle,
  restoreSelectedCategory,
} from './js/handlers';

import {
  clearButtonProducts,
  restoreSearchState,
  scrollToTop,
} from './js/helpers';

// Логіка сторінки Home
async function initHomePage() {
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
}

initHomePage();
