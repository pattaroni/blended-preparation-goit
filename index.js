import"./assets/styles-CqwNybf1.js";import{a as l,i}from"./assets/vendor-BO1i2NM4.js";const m="https://dummyjson.com",n={CATEGORIES:"/products/category-list",PRODUCTS:"/products"},d=12;l.defaults.baseURL=m;const _=async()=>{const{data:t}=await l.get(n.CATEGORIES);return t},u=async t=>{const{data:s}=await l.get(`${n.PRODUCTS}`,{params:{limit:d,skip:(t-1)*d}});return s},g=async t=>{const{data:s}=await l.get(`${n.PRODUCTS}/${t}`);return s},o={ulCategorEl:document.querySelector(".categories"),ulProductEl:document.querySelector(".products"),modalEl:document.querySelector(".modal"),modalCloseBtn:document.querySelector(".modal__close-btn"),modalListEl:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),loaderEl:document.querySelector(".loader"),scrollToTopBtn:document.querySelector(".scroll-top-btn")},y=t=>{const s=t.map(e=>`<li class="categories__item">
   <button class="categories__btn" type="button">${e}</button>
 </li>`).join("");o.ulCategorEl.innerHTML=s},p=t=>{const s=t.map(e=>`<li class="products__item" data-id="${e.id}">
    <img class="products__image" src="${e.thumbnail}" alt="${e.description}"/>
    <p class="products__title">${e.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${e.brand}</span></p>
    <p class="products__category">Category: ${e.category}</p>
    <p class="products__price">Price: ${e.price}$</p>
 </li>`).join("");o.ulProductEl.insertAdjacentHTML("beforeend",s)},E=t=>{const s=`<img class="modal-product__img" src="${t.thumbnail}" alt="${t.description}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${t.tags}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${t.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
        <p class="modal-product__price">Price: ${t.price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`;o.modalListEl.innerHTML=s};let r=1,a=0;const b=async()=>{try{const t=await _();y(["All",...t])}catch(t){console.log(t)}},L=async()=>{try{const t=await u(r);p(t.products),a=Math.ceil(t.total/t.limit),r<a?o.loadMoreBtn.classList.remove("is-hidden"):o.loadMoreBtn.classList.add("is-hidden")}catch(t){i.error({message:t})}o.loadMoreBtn.addEventListener("click",async()=>{o.loadMoreBtn.classList.add("is-hidden"),o.loaderEl.classList.add("is-visible"),r++;const t=await u(r);p(t.products),o.loaderEl.classList.remove("is-visible"),o.loadMoreBtn.classList.remove("is-hidden");const s=document.querySelector(".products__item");if(s){const e=s.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}r>=a&&(o.loadMoreBtn.classList.add("is-hidden"),i.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}))})},h=()=>{o.ulProductEl.addEventListener("click",async t=>{const s=t.target.closest("li");if(!s)return;const e=s.dataset.id;if(e){o.modalEl.classList.add("modal--is-open");try{const c=await g(e);E(c)}catch(c){i.error({message:c.message||"Failed to load product"})}}}),o.modalCloseBtn.addEventListener("click",()=>{o.modalEl.classList.remove("modal--is-open"),o.modalListEl.innerHTML=""}),o.modalEl.addEventListener("click",t=>{t.target===o.modalEl&&(o.modalEl.classList.remove("modal--is-open"),o.modalListEl.innerHTML="")})},T=()=>{window.addEventListener("scroll",()=>{window.scrollY>400?o.scrollToTopBtn.classList.add("scroll-top-btn--visible"):o.scrollToTopBtn.classList.remove("scroll-top-btn--visible")}),o.scrollToTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})};T();b();L();h();
//# sourceMappingURL=index.js.map
