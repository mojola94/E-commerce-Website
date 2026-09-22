const products = [
  {
    name: "T-shirt with Tape Details",
    category: "tshirt",
    star: 4.5,
    price: 120,
    image: "image 7-Photoroom.png",
  },
  {
    name: "Skinny Fit Jeans",
    category: "jeans",
    star: 3.5,
    price: 240,
    image: "image 8-Photoroom.png",
  },
  {
    name: "Checkered Shirt",
    category: "shirt",
    star: 4.5,
    price: 180,
    image: "image 9-Photoroom.png",
  },
  {
    name: "Sleeve Striped T-shirt",
    category: "tshirt",
    star: 4.5,
    price: 130,
    image: "image 10-Photoroom.png",
  },
  {
    name: "Vertical Striped Shirt",
    category: "shirt",
    star: 5.0,
    price: 212,
    image: "image 7 (1)-Photoroom.png",
  },
  {
    name: "Courage Graphic T-shirt",
    category: "tshirt",
    star: 3.0,
    price: 145,
    image: "image 8 (1)-Photoroom.png",
  },
  {
    name: "Loose Fit Bermuda Shorts",
    category: "shorts",
    star: 4.0,
    price: 160,
    image: "image 9 (1)-Photoroom.png",
  },
  {
    name: "Polo with Tipping Details",
    category: "polo",
    star: 4.5,
    price: 180,
    image: "image 10 (1)-Photoroom.png",
  },
];

function productCard(product) {
  return `
    <article class="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 md:w-[calc(25%-1.125rem)] md:p-3">
      <a href="./product.html?name=${encodeURIComponent(product.name)}" aria-label="View ${product.name}">
        <img src="./Assests/image/${product.image}" alt="${product.name}" class="aspect-square w-full rounded bg-gray-100 object-cover" />
      </a>
			<h2 class="mt-1 truncate text-[7px] font-semibold md:mt-3 md:text-base">${product.name}</h2>
      <div class="mt-0.5 truncate text-[7px] text-orange-500 md:mt-1 md:text-sm" aria-label="Rated ${product.star} out of 5">
        ${ratingStars(product.star)}
        <span class="ml-0.5 text-xs font-bold text-black md:ml-1 md:text-base">${product.star}/5</span>
      </div>
			<div class="mt-0.5 flex items-center justify-between gap-1 md:mt-1">
        <p class="text-[8px] font-medium md:text-base">$${product.price}</p>
        <button type="button" class="add-to-cart flex h-10 w-10 shrink-0 items-center justify-center md:h-11 md:w-11" data-product="${product.name}" aria-label="Add ${product.name} to cart" title="Add to cart">
          <img src="./Assests/image/icons8-add-30.png" alt="" class="h-full w-full object-contain" />
        </button>
      </div>
		</article>
	`;
}

function ratingStars(rating) {
  return Array.from(
    { length: Math.round(rating) },
    () =>
      '<img src="./Assests/image/icons8-star-48 (2).png" alt="" class="inline-block h-3 w-3 align-middle md:h-4 md:w-4" />',
  ).join("");
}

function addToCart(productName) {
  const cart = getCartItems();
  const item = cart.find((cartItem) => cartItem.name === productName);
  if (item) item.quantity += 1;
  else cart.push({ name: productName, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  if (typeof updateCartBadge === "function") updateCartBadge();
}

function increaseCartQuantity(productName) {
  const cart = getCartItems();
  const item = cart.find((cartItem) => cartItem.name === productName);
  if (item) item.quantity += 1;
  else cart.push({ name: productName, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  if (typeof updateCartBadge === "function") updateCartBadge();
}

function getCartItems() {
  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  return savedCart.reduce((cart, item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) existingItem.quantity += item.quantity;
    else cart.push({ ...item });
    return cart;
  }, []);
}

function wireCartButtons(scope) {
  scope.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product;
      addToCart(productName);
      window.location.href = `./product.html?name=${encodeURIComponent(productName)}`;
    });
  });
}

function mapProducts(items, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = items.length
    ? items.map(productCard).join("")
    : '<p class="basis-full py-10 text-center text-gray-500">No products match your search.</p>';
  wireCartButtons(target);
}

const searchQuery =
  new URLSearchParams(window.location.search).get("search")?.trim() || "";
const matchingProducts = searchQuery
  ? products.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    )
  : products;

if (document.getElementById("categoryGrid")) {
  const sortProducts = document.getElementById("sortProducts");
  const categoryFilters = [...document.querySelectorAll(".filter-category")];
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  const getFilteredProducts = () => {
    const selectedCategories = categoryFilters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);
    const minimum = Number(minPrice.value) || 0;
    const maximum = Number(maxPrice.value) || Infinity;

    return matchingProducts.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.price >= minimum &&
        product.price <= maximum,
    );
  };

  const sortAndRenderProducts = () => {
    const sortedProducts = [...getFilteredProducts()].sort(
      (firstProduct, secondProduct) => {
        if (sortProducts.value === "quality")
          return secondProduct.star - firstProduct.star;
        if (sortProducts.value === "demanding")
          return secondProduct.price - firstProduct.price;
        if (sortProducts.value === "high-quality")
          return secondProduct.star - firstProduct.star;
        if (sortProducts.value === "less-quality")
          return firstProduct.star - secondProduct.star;
        return 0;
      },
    );
    mapProducts(sortedProducts, "categoryGrid");
  };

  sortProducts?.addEventListener("change", sortAndRenderProducts);
  categoryFilters.forEach((filter) =>
    filter.addEventListener("change", sortAndRenderProducts),
  );
  minPrice?.addEventListener("input", sortAndRenderProducts);
  maxPrice?.addEventListener("input", sortAndRenderProducts);
  sortAndRenderProducts();

  const categoryTitle = document.getElementById("categoryTitle");
  const searchMessage = document.getElementById("searchMessage");
  if (searchQuery) {
    categoryTitle.textContent = `Search results for "${searchQuery}"`;
    searchMessage.textContent = `${matchingProducts.length} product${matchingProducts.length === 1 ? "" : "s"} found`;
  }
}

mapProducts(products.slice(0, 4), "productGrid");
mapProducts(products.slice(4), "product2Grid");
