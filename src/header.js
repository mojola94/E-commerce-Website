const siteHeader = document.getElementById("siteHeader");

if (siteHeader) {
  siteHeader.className = "contents";
  siteHeader.innerHTML = `
    <div id="announcementBar" class="relative flex h-10 w-full items-center justify-center bg-black px-4 text-xs md:text-sm">
      <div class="pr-6 text-center text-white">
        Sign up and get 20% off to your first order.
        <a href="category.html" class="ml-1 font-medium underline">Sign Up Now</a>
      </div>
      <button type="button" onclick="document.getElementById('announcementBar').style.display='none'" aria-label="Close announcement" class="absolute right-4 flex h-6 w-6 items-center justify-center">
        <span class="text-lg font-bold leading-none text-white">X</span>
      </button>
    </div>
    <div class="main-nav-sticky">
      <div class="flex flex-nowrap items-center justify-between bg-white px-6 py-6 shadow-sm md:px-12">
        <div class="flex items-center space-x-8">
          <a href="index.html"><img src="./Assests/image/SHOP.CO.png" alt="SHOP.CO Logo" class="h-6 object-contain md:h-8" /></a>
          <nav class="hidden items-center space-x-6 lg:flex">
            <a href="category.html" class="font-medium text-black hover:text-gray-600">Shop</a>
            <a href="product.html?name=ONE%20LIFE%20GRAPHIC%20T-SHIRT" class="font-medium text-black hover:text-gray-600">On Sale</a>
            <a href="index.html#new-arrivals" class="font-medium text-black hover:text-gray-600">New Arrivals</a>
            <a href="index.html#brands" class="font-medium text-black hover:text-gray-600">Brands</a>
          </nav>
        </div>
        <form action="category.html" method="get" class="hidden w-64 items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-black/50 md:flex lg:w-96">
          <button type="submit" aria-label="Search products" class="flex h-6 w-6 items-center justify-center">
            <img src="./Assests/image/icons8-search-48.png" alt="Search" class="h-5 w-5 object-contain opacity-60" />
          </button>
          <input type="search" name="search" placeholder="Search for products..." aria-label="Search for a product" class="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400" />
        </form>
        <form action="category.html" method="get" class="flex w-24 shrink items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-black/50 md:hidden">
          <button type="submit" aria-label="Search products" class="flex h-5 w-5 items-center justify-center">
            <img src="./Assests/image/icons8-search-48.png" alt="Search" class="h-4 w-4 object-contain opacity-60" />
          </button>
          <input type="search" name="search" placeholder="Search" aria-label="Search for a product" class="w-full bg-transparent text-xs text-black outline-none placeholder:text-gray-400" />
        </form>
        <div class="flex items-center space-x-4">
          <a href="cart.html" aria-label="Shopping Cart" class="relative">
            <img src="./Assests/image/icons8-shopping-cart-48.png" alt="Cart" class="h-6 w-6 object-contain" />
            <span id="cartCount" class="absolute -right-2 -top-2 hidden h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">0</span>
          </a>
          <a href="profile.html" aria-label="User Profile"><img src="./Assests/image/icons8-user-profile-24.png" alt="Profile" class="h-7 w-7 object-contain" /></a>
        </div>
      </div>
      <div class="flex items-center justify-around border-t border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-medium lg:hidden">
        <a href="category.html">Shop</a>
        <a href="product.html?name=ONE%20LIFE%20GRAPHIC%20T-SHIRT">On Sale</a>
        <a href="index.html#new-arrivals">New Arrivals</a>
        <a href="index.html#brands">Brands</a>
      </div>
    </div>
  `;
}
