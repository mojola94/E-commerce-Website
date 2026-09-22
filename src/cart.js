function getSavedCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return savedCart.reduce((cart, item) => {
      const existingItem = cart.find(
        (cartItem) =>
          cartItem.name === item.name &&
          (cartItem.size || "L") === (item.size || "L") &&
          (cartItem.color || "Black") === (item.color || "Black"),
      );
      if (existingItem) existingItem.quantity += item.quantity;
      else cart.push({ ...item });
      return cart;
    }, []);
  } catch {
    return [];
  }
}

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const count = getSavedCart().length;
  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0);
  badge.classList.toggle("flex", count > 0);
}

function changeCartQuantity(productName, change, options = {}) {
  const cart = getSavedCart();
  const item = cart.find(
    (cartItem) =>
      cartItem.name === productName &&
      (!options.size || (cartItem.size || "L") === options.size) &&
      (!options.color || (cartItem.color || "Black") === options.color),
  );
  if (!item) return;

  item.quantity += change;
  const updatedCart = cart.filter((cartItem) => cartItem.quantity > 0);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  updateCartBadge();
  renderCartPage();
}

function removeFromCart(productName) {
  const updatedCart = getSavedCart().filter(
    (item) => item.name !== productName,
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  updateCartBadge();
  renderCartPage();
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadge();
  renderCartPage();
}

function renderCartPage() {
  const list = document.getElementById("cartPageItems");
  if (!list || typeof products === "undefined") return;

  const items = getSavedCart()
    .map((item) => {
      const product = products.find(
        (savedProduct) => savedProduct.name === item.name,
      );
      return product
        ? {
            ...product,
            quantity: item.quantity,
            size: item.size || "L",
            color: item.color || "Black",
          }
        : null;
    })
    .filter(Boolean);

  list.innerHTML = items.length
    ? items
        .map(
          (item) => `
        <li class="flex items-center gap-3 py-4 md:gap-4">
          <img src="./Assests/image/${item.image}" alt="${item.name}" class="h-20 w-20 rounded bg-gray-100 object-cover md:h-24 md:w-24" />
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h2 class="truncate font-semibold">${item.name}</h2>
              <button type="button" class="remove-cart-item text-red-500" data-product="${item.name}" aria-label="Remove ${item.name}">×</button>
            </div>
            <label class="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <span>Size:</span>
              <select class="cart-option rounded border border-gray-200 px-2 py-1 text-black" data-option="size" data-product="${item.name}" data-current-size="${item.size}" data-current-color="${item.color}">
                ${["S", "M", "L", "XL", "XXL"].map((size) => `<option value="${size}" ${item.size === size ? "selected" : ""}>${size}</option>`).join("")}
              </select>
            </label>
            <label class="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <span>Color:</span>
              <select class="cart-option rounded border border-gray-200 px-2 py-1 text-black" data-option="color" data-product="${item.name}" data-current-size="${item.size}" data-current-color="${item.color}">
                ${["Moss", "Black", "Cream", "Navy"].map((color) => `<option value="${color}" ${item.color === color ? "selected" : ""}>${color}</option>`).join("")}
              </select>
            </label>
            <p class="mt-1 font-semibold">$${item.price}</p>
            <div class="mt-2 flex items-center gap-2">
              <button type="button" class="cart-quantity-button" data-action="decrease" data-product="${item.name}" data-size="${item.size}" data-color="${item.color}" aria-label="Decrease ${item.name} quantity">
                <img src="./Assests/image/icons8-minus-24.png" alt="Decrease quantity" class="h-5 w-5" />
              </button>
              <span class="min-w-5 text-center">${item.quantity}</span>
              <button type="button" class="cart-quantity-button" data-action="increase" data-product="${item.name}" data-size="${item.size}" data-color="${item.color}" aria-label="Increase ${item.name} quantity">
                <img src="./Assests/image/icons8-plus-24.png" alt="Increase quantity" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>
      `,
        )
        .join("")
    : '<li class="py-8 text-center text-gray-500">Your cart is empty.</li>';

  list.querySelectorAll(".cart-quantity-button").forEach((button) => {
    const change = button.dataset.action === "increase" ? 1 : -1;
    button.addEventListener("click", () =>
      changeCartQuantity(button.dataset.product, change, {
        size: button.dataset.size,
        color: button.dataset.color,
      }),
    );
  });

  list.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.addEventListener("click", () =>
      removeFromCart(button.dataset.product),
    );
  });

  list.querySelectorAll(".cart-option").forEach((select) => {
    select.addEventListener("change", () => {
      const cart = getSavedCart();
      const item = cart.find(
        (cartItem) =>
          cartItem.name === select.dataset.product &&
          (cartItem.size || "L") === select.dataset.currentSize &&
          (cartItem.color || "Black") === select.dataset.currentColor,
      );
      if (!item) return;

      const nextSize =
        select.dataset.option === "size" ? select.value : item.size;
      const nextColor =
        select.dataset.option === "color" ? select.value : item.color;
      const duplicate = cart.find(
        (cartItem) =>
          cartItem !== item &&
          cartItem.name === item.name &&
          (cartItem.size || "L") === nextSize &&
          (cartItem.color || "Black") === nextColor,
      );
      if (duplicate) {
        duplicate.quantity += item.quantity;
        cart.splice(cart.indexOf(item), 1);
      } else {
        item.size = nextSize;
        item.color = nextColor;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartPage();
      updateCartBadge();
    });
  });

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.2;
  const delivery = items.reduce((total, item) => total + item.quantity * 7, 0);
  document.getElementById("cartSubtotal").textContent = `$${subtotal}`;
  document.getElementById("cartDiscount").textContent = `-$${discount}`;
  document.getElementById("cartDelivery").textContent = `$${delivery}`;
  document.getElementById("cartTotal").textContent =
    `$${subtotal - discount + delivery}`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCartPage();
  document.getElementById("clearCart")?.addEventListener("click", clearCart);
});
