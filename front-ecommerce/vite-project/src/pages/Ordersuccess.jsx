const OrderSuccess = () =>{
return(
    <>
            <main>
    <section class="band">
      <div class="mx-auto max-w-3xl px-5 text-center">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Confirmed</p>
        <h1 class="mt-3 text-5xl font-black">Order ML-2048 is on the way.</h1>
        <p class="mt-5 text-lg leading-8 text-zinc-600">Your confirmation, receipt, shipping address, and tracking link
          are ready in your account.</p>
        <div class="mt-8 flex justify-center gap-3"><a class="btn-dark" href="order-detail.html">View order</a><a
            class="btn-light" href="products.html">Keep shopping</a></div>
      </div>
    </section>
  </main>
    </>
)
}

export default OrderSuccess