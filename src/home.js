import {
  getCategories,
  getProducts,
  submitEventFunction,
  productClickHandler,
  categoriesClickHandler,
} from './js/handlers';

import { clearButtonProducts, scrollToTop } from './js/helpers';

// Логіка сторінки Home
scrollToTop();
getCategories();
getProducts();
submitEventFunction();
clearButtonProducts();
productClickHandler();
categoriesClickHandler();
