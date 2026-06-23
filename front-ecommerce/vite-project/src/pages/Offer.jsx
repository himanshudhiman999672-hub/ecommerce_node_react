const Offer = () =>{
return(
    <>
    <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Offers</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Deals and bundles</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-7xl gap-5 px-5 md:grid-cols-3">
        <div class="promo">20% off fashion</div>
        <div class="promo">Free shipping over $100</div>
        <div class="promo">Beauty bundle savings</div>
      </div>
    </section>
  </main>
    </>
)
}

export default Offer