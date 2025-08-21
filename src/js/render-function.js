import { refs } from './refs';

export const renderCategories = data => {
  const markup = data
    .map(
      element => `<li class="categories__item">
   <button class="categories__btn" type="button">${element}</button>
 </li>`
    )
    .join('');
  refs.ulCategorEl.innerHTML = markup;
};

export const renderProducts = data => {
  const markup = data
    .map(
      product =>
        `<li class="products__item" data-id="${product.id}">
    <img class="products__image" src="${product.thumbnail}" alt="${product.description}"/>
    <p class="products__title">${product.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${product.brand}</span></p>
    <p class="products__category">Category: ${product.category}</p>
    <p class="products__price">Price: ${product.price}$</p>
 </li>`
    )
    .join('');

  refs.ulProductEl.insertAdjacentHTML('beforeend', markup);
};

export const renderByValue = data => {
  refs.ulProductEl.innerHTML = '';
  
    const markup = data
    .map(
      product =>
        `<li class="products__item" data-id="${product.id}">
    <img class="products__image" src="${product.thumbnail}" alt="${product.description}"/>
    <p class="products__title">${product.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${product.brand}</span></p>
    <p class="products__category">Category: ${product.category}</p>
    <p class="products__price">Price: ${product.price}$</p>
 </li>`
    )
    .join('');

  refs.ulProductEl.innerHTML = markup;
};