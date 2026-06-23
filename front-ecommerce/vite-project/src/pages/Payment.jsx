const Payment = () =>{
    return(
        <>
             <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Payments</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Cards and billing</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 max-w-4xl px-5 panel">
        <h2>Saved card</h2>
        <p class="text-zinc-600">Visa ending in 4242, expires 08/28</p><a class="btn-dark mt-5" href="checkout.html">Use
          at checkout</a>
      </div>
    </section>
  </main>
        </>
    )
}


export default Payment