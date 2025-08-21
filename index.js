import"./assets/styles-Dw4sMSfm.js";import{a as c,i as n}from"./assets/vendor-DCjS4zLf.js";const i="https://dummyjson.com",a={CATEGORIES:"/products/category-list",PRODUCTS:"/products"},l=12;c.defaults.baseURL=i;const d=async()=>{const{data:t}=await c.get(a.CATEGORIES);return t},u=async t=>{const{data:o}=await c.get(`${a.PRODUCTS}`,{params:{limit:l,skip:(t-1)*l}});return o},p=async t=>{const{data:o}=await c.get(`${a.PRODUCTS}/${t}`);return o},e={ulCategorEl:document.querySelector(".categories"),ulProductEl:document.querySelector(".products"),modalEl:document.querySelector(".modal"),modalCloseBtn:document.querySelector(".modal__close-btn"),modalListEl:document.querySelector(".modal-product")},m=t=>{const o=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");e.ulCategorEl.innerHTML=o},_=t=>{const o=t.map(s=>`<li class="products__item" data-id="${s.id}">
    <img class="products__image" src="${s.thumbnail}" alt="${s.description}"/>
    <p class="products__title">${s.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${s.brand}</span></p>
    <p class="products__category">Category: ${s.category}</p>
    <p class="products__price">Price: ${s.price}$</p>
 </li>`).join("");e.ulProductEl.insertAdjacentHTML("beforeend",o)},g=t=>{const o=`<img class="modal-product__img" src="${t.thumbnail}" alt="${t.description}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${t.tags}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${t.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
        <p class="modal-product__price">Price: ${t.price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`;e.modalListEl.innerHTML=o};let y=1;const E=async()=>{try{const t=await d();m(["All",...t])}catch(t){console.log(t)}},$=async()=>{try{const t=await u(y);_(t.products)}catch(t){n.error({message:t})}},P=()=>{e.ulProductEl.addEventListener("click",async t=>{const o=t.target.closest("li");if(!o)return;const s=o.dataset.id;if(s){e.modalEl.classList.add("modal--is-open");try{const r=await p(s);g(r)}catch(r){n.error({message:r.message||"Failed to load product"})}}}),e.modalCloseBtn.addEventListener("click",()=>{e.modalEl.classList.remove("modal--is-open"),e.modalListEl.innerHTML=""}),e.modalEl.addEventListener("click",t=>{t.target===e.modalEl&&(e.modalEl.classList.remove("modal--is-open"),e.modalListEl.innerHTML="")})};E();$();P();
//# sourceMappingURL=index.js.map
