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

export const renderProductByID = data => {
  const markup = `<img class="modal-product__img" src="${data.thumbnail}" alt="${data.description}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${data.title}</p>
        <ul class="modal-product__tags">${data.tags}</ul>
        <p class="modal-product__description">${data.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${data.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${data.returnPolicy}</p>
        <p class="modal-product__price">Price: ${data.price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`;
  refs.modalListEl.innerHTML = markup;
};
