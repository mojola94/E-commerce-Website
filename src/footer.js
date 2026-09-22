const siteFooter = document.getElementById("siteFooter");

if (siteFooter) {
  siteFooter.className = "bg-white p-10 md:p-10";
  siteFooter.innerHTML = `
    <div class="mx-auto max-w-6xl border-t border-black/10 pt-8">
      <div class="grid gap-5 md:grid-cols-[2.5fr_1fr_1fr_1fr_1fr]">
        <div>
          <img src="./Assests/image/SHOP.CO.png" alt="SHOP.CO" class="mb-4 h-8" />
          <p class="max-w-xs text-sm text-black/60">
            We have clothes that suit your style and which you're proud to wear. From everyday basics to standout pieces.
          </p>
          <div class="mt-6 flex gap-3">
            <img src="./Assests/image/1.png" alt="Social media" class="h-8 w-8" />
            <img src="./Assests/image/icons8-facebook-50.png" alt="Facebook" class="h-8 w-8" />
            <img src="./Assests/image/icons8-ig-50.png" alt="Instagram" class="h-8 w-8" />
            <img src="./Assests/image/4.png" alt="Social media" class="h-8 w-8" />
          </div>
        </div>
        <div><h3 class="mb-4 text-sm font-bold uppercase text-black/70">Company</h3><p class="text-sm text-black/60">About</p><p class="mt-2 text-sm text-black/60">Features</p><p class="mt-2 text-sm text-black/60">Works</p><p class="mt-2 text-sm text-black/60">Career</p></div>
        <div><h3 class="mb-4 text-sm font-bold uppercase text-black/70">Help</h3><p class="text-sm text-black/60">Customer Support</p><p class="mt-2 text-sm text-black/60">Delivery Details</p><p class="mt-2 text-sm text-black/60">Terms &amp; Conditions</p><p class="mt-2 text-sm text-black/60">Privacy Policy</p></div>
        <div><h3 class="mb-4 text-sm font-bold uppercase text-black/70">FAQ</h3><p class="text-sm text-black/60">Account</p><p class="mt-2 text-sm text-black/60">Manage Deliveries</p><p class="mt-2 text-sm text-black/60">Orders</p><p class="mt-2 text-sm text-black/60">Payments</p></div>
        <div><h3 class="mb-4 text-sm font-bold uppercase text-black/70">Resources</h3><p class="text-sm text-black/60">Free ebooks</p><p class="mt-2 text-sm text-black/60">Development Tutorial</p><p class="mt-2 text-sm text-black/60">How to - Blog</p><p class="mt-2 text-sm text-black/60">Youtube Playlist</p></div>
      </div>
      <div class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-black/50 md:flex-row">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div class="flex gap-3">
          <img src="./Assests/image/Badge.png" alt="Payment method" />
          <img src="./Assests/image/Badge (1).png" alt="Payment method" />
          <img src="./Assests/image/Badge (2).png" alt="Payment method" />
          <img src="./Assests/image/Badge (3).png" alt="Payment method" />
          <img src="./Assests/image/Badge (4).png" alt="Payment method" />
        </div>
      </div>
    </div>
  `;
}
