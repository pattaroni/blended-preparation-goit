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
await getCategories(); // ✅ чекаємо, поки кнопки з'являться
      restoreSelectedCategory(); // ✅ тепер можна активувати збережену категорію
await getProducts(); // якщо хочеш, щоб продукти теж чекали категорію
      submitEventFunction();
      clearButtonProducts();
      productClickHandler();
      categoriesClickHandler();
      initLoadMoreHandler();
      initThemeToggle();
  restoreUserValue(refs, searchByValue);
  restoreSearchState();
}

initHomePage(); // запускаємо

