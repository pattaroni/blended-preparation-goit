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

import { clearButtonProducts,restoreSearchState,restoreUserValue,scrollToTop } from './js/helpers';
import { searchByValue } from './js/products-api';
import { refs } from './js/refs';

// Логіка сторінки Home
async function initHomePage() {
      scrollToTop();
await getCategories();
      restoreSelectedCategory(); 
await getProducts(); 
      submitEventFunction();
      clearButtonProducts();
      productClickHandler();
      categoriesClickHandler();
      initLoadMoreHandler();
      initThemeToggle();
  restoreUserValue(refs, searchByValue);
  restoreSearchState();
}

initHomePage(); 

