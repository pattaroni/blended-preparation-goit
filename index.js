import"./assets/styles-Dw4sMSfm.js";import{a as o}from"./assets/vendor-CJ4cOYKs.js";const a="https://dummyjson.com",r={CATEGORIES:"/products/category-list"};o.defaults.baseURL=a;const c=async()=>{const{data:t}=await o.get(r.CATEGORIES);return t},n={ulCategorEl:document.querySelector(".categories")},i=t=>{const e=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");n.ulCategorEl.innerHTML=e},l=async()=>{try{const t=await c();i(["All",...t])}catch(t){console.log(t)}};l();
//# sourceMappingURL=index.js.map
