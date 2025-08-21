import { getCategories, getProducts, productClickHandler } from './js/handlers';
import { scrollToTop } from './js/helpers';

//Логіка сторінки Home
scrollToTop();
getCategories();
getProducts();
productClickHandler();
