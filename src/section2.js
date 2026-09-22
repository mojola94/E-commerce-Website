const section2 = document.getElementById("section2");

if (section2) {
  section2.innerHTML = `
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-black p-8 text-white md:flex-row">
      <h2 class="max-w-md text-3xl font-bold uppercase leading-tight md:text-4xl">
        STAY UP TO DATE ABOUT <br />OUR LATEST OFFERS
      </h2>
      <form class="flex w-full max-w-xl flex-col gap-3 md:w-auto md:min-w-[420px]">
        <div class="flex items-center gap-4 rounded-full bg-white px-4 py-3 text-black">
          <img src="./Assests/image/Frame.png" alt="" class="h-5 w-5" />
          <input type="email" placeholder="Enter your email address" class="w-full border-0 bg-transparent text-sm text-black outline-none placeholder:text-black/60" />
        </div>
        <button type="submit" class="rounded-full border border-white bg-white px-6 py-3 font-medium text-black">Subscribe to Newsletter</button>
      </form>
    </div>
  `;
}
