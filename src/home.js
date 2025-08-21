import {
  getCategories,
  getProducts,
  submitEventFunction,
  productClickHandler,
} from './js/handlers';
import { clearButtonProducts } from './js/helpers';

// Логіка сторінки Home
getCategories();
getProducts();
submitEventFunction();
clearButtonProducts();
productClickHandler();
