import { fetchCategories } from "./products-api";
import { renderCategories } from "./render-function";

//всі функції обробники
export const getCategories = async () => {
    try {
        const dataProducts = await fetchCategories();
        renderCategories(['All',...dataProducts])
    } catch (error) {
        console.log(error);
        
    }
}