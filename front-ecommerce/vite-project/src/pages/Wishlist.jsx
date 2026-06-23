const Wishlist = () =>{
    return(
        <>
         <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Wishlist</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Saved for later</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 max-w-7xl px-5">
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article class="product-card">
            <a href="product-detail.html"><img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
                alt="Nomad Canvas Backpack" class="product-img" /></a>
            <div class="p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-black uppercase tracking-normal text-zinc-500">Travel</p>
                  <h3 class="mt-1 text-lg font-black"><a href="product-detail.html">Nomad Canvas Backpack</a></h3>
                </div>
                <p class="font-black">$92</p>
              </div>
              <div class="mt-4 flex gap-2">
                <a class="btn-dark flex-1" href="cart.html">Add to cart</a>
                <a class="btn-light" href="wishlist.html">♡</a>
              </div>
            </div>
          </article>
          <article class="product-card">
            <a href="product-detail.html"><img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
                alt="Linen Home Throw" class="product-img" /></a>
            <div class="p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-black uppercase tracking-normal text-zinc-500">Home</p>
                  <h3 class="mt-1 text-lg font-black"><a href="product-detail.html">Linen Home Throw</a></h3>
                </div>
                <p class="font-black">$54</p>
              </div>
              <div class="mt-4 flex gap-2">
                <a class="btn-dark flex-1" href="cart.html">Add to cart</a>
                <a class="btn-light" href="wishlist.html">♡</a>
              </div>
            </div>
          </article>
          <article class="product-card">
            <a href="product-detail.html"><img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
                alt="Ceramic Desk Lamp" class="product-img" /></a>
            <div class="p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-black uppercase tracking-normal text-zinc-500">Home</p>
                  <h3 class="mt-1 text-lg font-black"><a href="product-detail.html">Ceramic Desk Lamp</a></h3>
                </div>
                <p class="font-black">$78</p>
              </div>
              <div class="mt-4 flex gap-2">
                <a class="btn-dark flex-1" href="cart.html">Add to cart</a>
                <a class="btn-light" href="wishlist.html">♡</a>
              </div>
            </div>
          </article>
          <article class="product-card">
            <a href="product-detail.html"><img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
                alt="Hydra Skincare Set" class="product-img"  /></a>
            <div class="p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-black uppercase tracking-normal text-zinc-500">Beauty</p>
                  <h3 class="mt-1 text-lg font-black"><a href="product-detail.html">Hydra Skincare Set</a></h3>
                </div>
                <p class="font-black">$46</p>
              </div>
              <div class="mt-4 flex gap-2">
                <a class="btn-dark flex-1" href="cart.html">Add to cart</a>
                <a class="btn-light" href="wishlist.html">♡</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
        </>
    )
}

export default Wishlist