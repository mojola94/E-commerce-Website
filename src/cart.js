function getSavedCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return savedCart.reduce((cart, item) => {
      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
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

function changeCartQuantity(productName, change) {
  const cart = getSavedCart();
  const item = cart.find((cartItem) => cartItem.name === productName);
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
      return product ? { ...product, quantity: item.quantity } : null;
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
            <p class="text-xs text-gray-500">Size: Medium</p>
            <p class="text-xs text-gray-500">Color: White</p>
            <p class="mt-1 font-semibold">$${item.price}</p>
            <div class="mt-2 flex items-center gap-2">
              <button type="button" class="cart-quantity-button" data-action="decrease" data-product="${item.name}" aria-label="Decrease ${item.name} quantity">
                <img src="./Assests/image/icons8-minus-24.png" alt="Decrease quantity" class="h-5 w-5" />
              </button>
              <span class="min-w-5 text-center">${item.quantity}</span>
              <button type="button" class="cart-quantity-button" data-action="increase" data-product="${item.name}" aria-label="Increase ${item.name} quantity">
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
      changeCartQuantity(button.dataset.product, change),
    );
  });

  list.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.addEventListener("click", () =>
      removeFromCart(button.dataset.product),
    );
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
