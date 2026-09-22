// const searchForm = document.getElementById("searchForm");
// const searchInput = document.getElementById("searchButton");

// searchForm?.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const query = searchInput.value.trim();
//   window.location.href = query
//     ? `category.html?search=${encodeURIComponent(query)}`
//     : "category.html";
// });

// const SIZES = ["Small", "Medium", "Large", "X-Large"];
// const COLORS = ["#4F4631", "#314F4A", "#31344F"];
// const DESCRIPTION =
//   "This graphic t-shirt is perfect for any occasion. Crafted from a soft, " +
//   "breathable fabric that keeps you comfortable all day long.";

// // ---------- cart persistence (localStorage) ----------
// function getCart() {
//   try {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   } catch {
//     return [];
//   }
// }

// function saveCart(cart) {
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCartBadge();
// }

// function addToCart(id, qty = 1) {
//   const cart = getCart();
//   const existing = cart.find((i) => i.id === id);
//   if (existing) existing.qty += qty;
//   else cart.push({ id, qty });
//   saveCart(cart);
// }

// function removeFromCart(id) {
//   saveCart(getCart().filter((i) => i.id !== id));
// }

// function setQty(id, qty) {
//   if (qty < 1) return removeFromCart(id);
//   const cart = getCart();
//   const item = cart.find((i) => i.id === id);
//   if (item) item.qty = qty;
//   saveCart(cart);
// }

// function cartWithProducts() {
//   return getCart()
//     .map((item) => {
//       const product = PRODUCTS.find((p) => p.id === item.id);
//       return product ? { ...product, qty: item.qty } : null;
//     })
//     .filter(Boolean);
// }

// function cartCount() {
//   return getCart().reduce((n, i) => n + i.qty, 0);
// }

// function cartSubtotal() {
//   return cartWithProducts().reduce((sum, i) => sum + i.price * i.qty, 0);
// }

// function updateCartBadge() {
//   const badge = document.getElementById("cartCount");
//   if (!badge) return;
//   const count = cartCount();
//   badge.textContent = count;
//   badge.classList.toggle("hidden", count === 0);
// }

// function stars(rating) {
//   const full = Math.round(rating);
//   return "★".repeat(full) + "☆".repeat(5 - full);
// }

// // ---------- shared header ----------
// function renderHeader() {
//   const el = document.getElementById("siteHeader");
//   if (!el) return;
//   el.innerHTML = `
//     <div id="promoBar" class="flex bg-black h-10 items-center justify-center relative px-4">
//       <div class="text-white text-sm text-center">
//         Sign up and get 20% off to your first order.
//         <a href="#SignUp" class="underline">Sign Up Now</a>
//       </div>
//       <button id="closePromo" class="absolute right-4 text-white text-xl leading-none">&times;</button>
//     </div>

//     <div class="flex justify-between items-center gap-4 p-4 md:p-6 bg-white sticky top-0 z-50 border-b">
//       <div class="flex items-center gap-3">
//         <button id="mobileMenuButton" class="md:hidden text-2xl" aria-label="Menu">&#9776;</button>
//         <a href="index.html" class="font-black text-2xl tracking-tight">SHOP.CO</a>
//       </div>

//       <nav class="hidden md:block">
//         <ul class="flex space-x-4 items-center">
//           <li class="relative">
//             <details class="group">
//               <summary class="flex cursor-pointer list-none items-center gap-1 text-black">
//                 Shop
//                 <span class="group-open:rotate-180 transition-transform" aria-hidden="true">⌄</span>
//               </summary>
//               <ul class="absolute left-0 top-full z-10 mt-2 min-w-32 rounded-md bg-white p-2 shadow-lg">
//                 <li><a href="category.html" class="block px-2 py-1 text-black hover:bg-gray-100">Men</a></li>
//                 <li><a href="category.html" class="block px-2 py-1 text-black hover:bg-gray-100">Women</a></li>
//               </ul>
//             </details>
//           </li>
//           <li><a href="category.html" class="text-black">On Sale</a></li>
//           <li><a href="category.html" class="text-black">New Arrivals</a></li>
//           <li><a href="category.html" class="text-black">Brands</a></li>
//         </ul>
//       </nav>

//       <div class="hidden md:flex bg-gray-100 text-black/50 px-4 py-2 rounded-full items-center gap-2 grow max-w-md">
//         <span aria-hidden="true">🔍</span>
//         <input type="text" placeholder="Search for products..." class="bg-transparent outline-none w-full text-black placeholder:text-black/40" />
//       </div>

//       <div class="flex items-center space-x-4">
//         <a href="cart.html" class="relative text-2xl" aria-label="Cart">
//           🛒
//           <span id="cartCount" class="hidden absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
//         </a>
//         <span class="text-2xl" aria-hidden="true">👤</span>
//       </div>
//     </div>

//     <div id="mobileMenu" class="hidden md:hidden border-b bg-white p-4 space-y-4">
//       <div class="bg-gray-100 text-black/50 px-4 py-2 rounded-full flex items-center gap-2">
//     </div>
//   `;

//   document.getElementById("closePromo").addEventListener("click", (e) => {
//     e.target.closest("#promoBar").remove();
//   });
//   document.getElementById("mobileMenuButton").addEventListener("click", () => {
//     document.getElementById("mobileMenu").classList.toggle("hidden");
//   });
//   updateCartBadge();
// }

// // ---------- homepage: new arrivals preview ----------
// function renderHomeGrid() {
//   const grid = document.getElementById("productGrid");
//   grid.innerHTML = PRODUCTS.slice(0, 4).map(productCard).join("");
//   wireAddToCartButtons(grid);
// }

// function productCard(p) {
//   return `
//     <a href="product.html?id=${p.id}" class="border rounded-lg p-4 flex flex-col gap-2 hover:shadow-md transition">
//       <img src="${p.image}" alt="${p.name}" class="rounded-lg w-full h-48 object-cover" />
//       <h3 class="font-medium">${p.name}</h3>
//       <p class="text-yellow-500 text-sm">${stars(p.rating)} <span class="text-black/50">${p.rating}/5</span></p>
//       <p class="font-bold">$${p.price}</p>
//       <button class="add-to-cart rounded-full bg-black text-white py-2 mt-auto" data-id="${p.id}">
//         Add to Cart
//       </button>
//     </a>`;
// }

// function wireAddToCartButtons(scope) {
//   scope.querySelectorAll(".add-to-cart").forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       addToCart(Number(btn.dataset.id));
//       btn.textContent = "Added!";
//       setTimeout(() => (btn.textContent = "Add to Cart"), 800);
//     });
//   });
// }

// // ---------- category page ----------
// function renderCategoryPage() {
//   const grid = document.getElementById("categoryGrid");
//   const categoryBoxes = document.querySelectorAll(".filter-category");
//   const minPrice = document.getElementById("minPrice");
//   const maxPrice = document.getElementById("maxPrice");

//   function apply() {
//     const checked = [...categoryBoxes]
//       .filter((c) => c.checked)
//       .map((c) => c.value);
//     const min = Number(minPrice.value) || 0;
//     const max = Number(maxPrice.value) || Infinity;
//     const filtered = PRODUCTS.filter(
//       (p) =>
//         (checked.length === 0 || checked.includes(p.category)) &&
//         p.price >= min &&
//         p.price <= max,
//     );
//     grid.innerHTML = filtered.length
//       ? filtered.map(productCard).join("")
//       : `<p class="col-span-full text-center text-black/50">No products match those filters.</p>`;
//     wireAddToCartButtons(grid);
//   }

//   categoryBoxes.forEach((c) => c.addEventListener("change", apply));
//   minPrice.addEventListener("input", apply);
//   maxPrice.addEventListener("input", apply);
//   apply();
// }

// // ---------- product detail page ----------
// function renderProductPage() {
//   const id =
//     Number(new URLSearchParams(location.search).get("id")) || PRODUCTS[0].id;
//   const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
//   const el = document.getElementById("productDetail");

//   el.innerHTML = `
//     <img src="${product.image}" alt="${product.name}" class="rounded-lg w-full max-w-md h-96 object-cover" />
//     <div class="flex-1 min-w-64">
//       <h1 class="text-3xl font-bold">${product.name}</h1>
//       <p class="text-yellow-500 my-2">${stars(product.rating)} <span class="text-black/50">${product.rating}/5</span></p>
//       <p class="text-2xl font-bold my-2">$${product.price}</p>
//       <p class="text-black/60 my-4">${DESCRIPTION}</p>

//       <div class="my-4">
//         <p class="text-black/50 mb-2">Select Colors</p>
//         <div class="flex gap-2">
//           ${COLORS.map(
//             (c, i) =>
//               `<button class="color-swatch h-8 w-8 rounded-full border-2 ${i === 0 ? "border-black" : "border-transparent"}" style="background:${c}" data-color="${c}"></button>`,
//           ).join("")}
//         </div>
//       </div>

//       <div class="my-4">
//         <p class="text-black/50 mb-2">Choose Size</p>
//         <div class="flex gap-2 flex-wrap">
//           ${SIZES.map(
//             (s, i) =>
//               `<button class="size-option rounded-full border px-4 py-2 ${i === 1 ? "bg-black text-white" : ""}" data-size="${s}">${s}</button>`,
//           ).join("")}
//         </div>
//       </div>

//       <div class="flex items-center gap-4 my-6">
//         <div class="flex items-center border rounded-full">
//           <button id="qtyMinus" class="px-4 py-2">-</button>
//           <span id="qtyValue" class="px-4">1</span>
//           <button id="qtyPlus" class="px-4 py-2">+</button>
//         </div>
//         <button id="addToCartBtn" class="rounded-full bg-black text-white py-3 px-10 font-medium">Add to Cart</button>
//       </div>
//     </div>
//   `;

//   el.querySelectorAll(".color-swatch").forEach((btn) =>
//     btn.addEventListener("click", () => {
//       el.querySelectorAll(".color-swatch").forEach((b) =>
//         b.classList.replace("border-black", "border-transparent"),
//       );
//       btn.classList.replace("border-transparent", "border-black");
//     }),
//   );
//   el.querySelectorAll(".size-option").forEach((btn) =>
//     btn.addEventListener("click", () => {
//       el.querySelectorAll(".size-option").forEach((b) =>
//         b.classList.remove("bg-black", "text-white"),
//       );
//       btn.classList.add("bg-black", "text-white");
//     }),
//   );

//   let qty = 1;
//   const qtyValue = el.querySelector("#qtyValue");
//   el.querySelector("#qtyMinus").addEventListener("click", () => {
//     qty = Math.max(1, qty - 1);
//     qtyValue.textContent = qty;
//   });
//   el.querySelector("#qtyPlus").addEventListener("click", () => {
//     qty += 1;
//     qtyValue.textContent = qty;
//   });
//   const addBtn = el.querySelector("#addToCartBtn");
//   addBtn.addEventListener("click", () => {
//     addToCart(product.id, qty);
//     addBtn.textContent = "Added!";
//     setTimeout(() => (addBtn.textContent = "Add to Cart"), 800);
//   });
// }

// // ---------- cart page ----------
// function renderCartPage() {
//   const list = document.getElementById("cartPageItems");
//   const items = cartWithProducts();

//   list.innerHTML = items.length
//     ? items
//         .map(
//           (p) => `
//       <li class="flex gap-4 border-b pb-4">
//         <img src="${p.image}" alt="${p.name}" class="h-24 w-24 object-cover rounded-lg" />
//         <div class="flex-1">
//           <div class="flex justify-between">
//             <h3 class="font-medium">${p.name}</h3>
//             <button class="remove-item text-red-500" data-id="${p.id}" aria-label="Remove">🗑</button>
//           </div>
//           <p class="font-bold mt-1">$${p.price}</p>
//           <div class="flex items-center border rounded-full w-fit mt-2">
//             <button class="qty-minus px-3 py-1" data-id="${p.id}">-</button>
//             <span class="px-3">${p.qty}</span>
//             <button class="qty-plus px-3 py-1" data-id="${p.id}">+</button>
//           </div>
//         </div>
//       </li>`,
//         )
//         .join("")
//     : `<li class="text-center text-black/50 py-10">Your cart is empty. <a href="category.html" class="underline">Continue shopping</a></li>`;

//   const subtotal = cartSubtotal();
//   const delivery = items.length ? 15 : 0;
//   document.getElementById("cartSubtotal").textContent = `$${subtotal}`;
//   document.getElementById("cartDelivery").textContent = `$${delivery}`;
//   document.getElementById("cartFinalTotal").textContent =
//     `$${subtotal + delivery}`;

//   list.querySelectorAll(".remove-item").forEach((btn) =>
//     btn.addEventListener("click", () => {
//       removeFromCart(Number(btn.dataset.id));
//       renderCartPage();
//     }),
//   );
//   list.querySelectorAll(".qty-minus").forEach((btn) =>
//     btn.addEventListener("click", () => {
//       const item = getCart().find((i) => i.id === Number(btn.dataset.id));
//       setQty(Number(btn.dataset.id), (item?.qty || 1) - 1);
//       renderCartPage();
//     }),
//   );
//   list.querySelectorAll(".qty-plus").forEach((btn) =>
//     btn.addEventListener("click", () => {
//       const item = getCart().find((i) => i.id === Number(btn.dataset.id));
//       setQty(Number(btn.dataset.id), (item?.qty || 1) + 1);
//       renderCartPage();
//     }),
//   );

//   document.getElementById("checkoutBtn")?.addEventListener("click", () => {
//     alert("Checkout isn't wired up — this is a frontend-only demo.");
//   });
// }

// // ---------- boot ----------
// document.addEventListener("DOMContentLoaded", () => {
//   renderHeader();
//   if (document.getElementById("productGrid")) renderHomeGrid();
//   if (document.getElementById("categoryGrid")) renderCategoryPage();
//   if (document.getElementById("productDetail")) renderProductPage();
//   if (document.getElementById("cartPageItems")) renderCartPage();
// });
