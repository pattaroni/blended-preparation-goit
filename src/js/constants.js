export const BASE_URL = 'https://dummyjson.com';
export const ENDPOINTS = {
  CATEGORIES: `/products/category-list`,
  PRODUCTS: `/products`,
  SEARCH: `/products/search`,
  PRODUCTS_BY_CATEGORY: `/products/category`,
};

export const PER_PAGE = 12;

export const CONTENT_TYPES = {
  COMMON: 'common',
  PRODUCTS_BY_CATEGORY: 'productsByCategory',
  SEARCH: 'search',
};

// Ключ для localStorage
export const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
  USER_VALUE: 'userValue',
  SELECTED_CATEGORY: 'selectedCategory',
};
