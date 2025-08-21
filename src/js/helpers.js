import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from "./refs";
import { getProducts } from "./handlers";


export const checkStatusUserValue = userValue => {
 
    if (!userValue) {
    iziToast.warning({ message: 'Введіть значення для пошуку' });
    return false;
  }
  return true;
};

export const checkStatusSearchProduct = result => {
  
  if (!result.products || result.products.length === 0) {
    iziToast.warning({ message: 'Нічого не знайдено' });
    return false;
  }
  return true;
};

export const clearButtonProducts = () => {
     
        refs.clearBtnForm.addEventListener('click', e => {
        refs.ulProductEl.innerHTML = '';
        refs.searchFormEl.searchValue.value = '';
        refs.clearBtnForm.classList.remove('search-form__btn-clear--visible');
        refs.notFoundEl.classList.remove('not-found--visible');

    getProducts();
    })
}