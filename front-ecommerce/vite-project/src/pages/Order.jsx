const Order = () =>{
    return(
        <>
        
          <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Orders</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Your order history</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-7xl gap-4 px-5">
        <a class="order-row" href="order-detail.html"><span><strong>ML-2048</strong><small>May 27,
              2026</small></span><span>Preparing</span><strong>$318</strong></a><a class="order-row"
          href="order-detail.html"><span><strong>ML-1982</strong><small>May 18,
              2026</small></span><span>Delivered</span><strong>$92</strong></a><a class="order-row"
          href="order-detail.html"><span><strong>ML-1844</strong><small>April 30,
              2026</small></span><span>Returned</span><strong>$46</strong></a>
      </div>
    </section>
  </main>
  </>
    )
}

export default Order