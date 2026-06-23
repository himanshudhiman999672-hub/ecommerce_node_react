const Shipping = () =>{
return(
    <>
       <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Shipping</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Delivery options</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-5xl gap-5 px-5 md:grid-cols-3">
        <div class="tile"><strong>Standard</strong><span>2-5 business days.</span></div>
        <div class="tile"><strong>Express</strong><span>1-2 business days.</span></div>
        <div class="tile"><strong>Pickup</strong><span>Collect from partner stores.</span></div>
      </div>
    </section>
    </>
)
}

export default Shipping