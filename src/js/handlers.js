import iziToast from 'izitoast';
import { fetchCategories, fetchProducts, searchByValue } from './products-api';
import { renderByValue, renderCategories, renderProducts } from './render-function';
import { refs } from './refs';
import { checkStatusSearchProduct, checkStatusUserValue } from './helpers';

let currentPage = 1;
let userValue
//всі функції обробники
export const getCategories = async () => {
  try {
    const result = await fetchCategories();
    renderCategories(['All', ...result]);
  } catch (error) {
    iziToast.error({ message: error });
  }
};

export const getProducts = async () => {
  try {
    const result = await fetchProducts(currentPage);
    renderProducts(result.products);
  } catch (err) {
    iziToast.error({ message: err });
  }
};

export const submitEventFunction = () => {
  refs.searchFormEl.addEventListener('submit', async e =>{
    e.preventDefault();
      userValue = e.target.searchValue.value.trim();
      if (!checkStatusUserValue(userValue)) return;
      if (userValue) {
          refs.clearBtnForm.classList.add('search-form__btn-clear--visible');

         
      }
    try {
        const result = await searchByValue(userValue, currentPage);
        if (!checkStatusSearchProduct(result)) {
            refs.notFoundEl.classList.add('not-found--visible');
            refs.ulProductEl.innerHTML = '';
            return;
        }
        
        refs.notFoundEl.classList.remove('not-found--visible');
        renderByValue(result.products)
    } catch (error) {
       iziToast.error({ message: error }); 
    }
})  
}

