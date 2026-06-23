const OrderDetails = () =>{
    return(
        <>
          <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Order ML-2048</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Preparing for dispatch</h1>
          <p class="max-w-xl text-base leading-7 text-zinc-600">Estimated delivery: May 31, 2026.</p>
        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-7xl gap-6 px-5 lg:grid-cols-3">
        <div class="panel lg:col-span-2">
          <h2>Items</h2>
          <article class="line-item compact"><img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
              alt="Aurora Knit Overshirt" />
            <div>
              <h3>Aurora Knit Overshirt</h3>
              <p>Qty 1</p>
            </div><strong>$68</strong>
          </article>
          <article class="line-item compact"><img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
              alt="Studio Wireless Headphones" />
            <div>
              <h3>Studio Wireless Headphones</h3>
              <p>Qty 1</p>
            </div><strong>$129</strong>
          </article>
          <article class="line-item compact"><img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
              alt="Nomad Canvas Backpack" /> 
            <div>
              <h3>Nomad Canvas Backpack</h3>
              <p>Qty 1</p>
            </div><strong>$92</strong>
          </article>
        </div>
        <aside class="panel">
          <h2>Progress</h2>
          <ol class="steps">
            <li class="done">Order placed</li>
            <li class="done">Payment captured</li>
            <li>Package ready</li>
            <li>Delivered</li>
          </ol><a class="btn-dark mt-5 w-full" href="track-order.html">Track package</a>
        </aside>
      </div>
    </section>
  </main>
        </>
    )
}

export default OrderDetails