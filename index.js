import"./assets/styles-Dw4sMSfm.js";import{a as e,i as n}from"./assets/vendor-DCjS4zLf.js";const i="https://dummyjson.com",c={CATEGORIES:"/products/category-list",PRODUCTS:"/products"},r=12;e.defaults.baseURL=i;const l=async()=>{const{data:t}=await e.get(c.CATEGORIES);return t},d=async t=>{const{data:a}=await e.get(`${c.PRODUCTS}`,{params:{limit:r,skip:(t-1)*r}});return a},o={ulCategorEl:document.querySelector(".categories"),ulProductEl:document.querySelector(".products")},u=t=>{const a=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");o.ulCategorEl.innerHTML=a},p=t=>{const a=t.map(s=>`<li class="products__item" data-id="${s.id}">
    <img class="products__image" src="${s.thumbnail}" alt="${s.description}"/>
    <p class="products__title">${s.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${s.brand}</span></p>
    <p class="products__category">Category: ${s.category}</p>
    <p class="products__price">Price: ${s.price}$</p>
 </li>`).join("");o.ulProductEl.insertAdjacentHTML("beforeend",a)};let g=1;const m=async()=>{try{const t=await l();u(["All",...t])}catch(t){console.log(t)}},_=async()=>{try{const t=await d(g);p(t.products)}catch(t){n.error({message:t})}};m();_();
//# sourceMappingURL=index.js.map
