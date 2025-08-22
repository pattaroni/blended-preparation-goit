import {
  getCategories,
  getProducts,
  submitEventFunction,
  productClickHandler,
  categoriesClickHandler,
  initLoadMoreHandler,
  initThemeToggle,
  restoreUserValue,
} from './js/handlers';

import { clearButtonProducts,scrollToTop } from './js/helpers';
import { searchByValue } from './js/products-api';
import { refs } from './js/refs';

// Логіка сторінки Home
scrollToTop();
getCategories();
getProducts();
submitEventFunction();
clearButtonProducts();
productClickHandler();
categoriesClickHandler();
initLoadMoreHandler();
initThemeToggle();
restoreUserValue(refs, searchByValue);
