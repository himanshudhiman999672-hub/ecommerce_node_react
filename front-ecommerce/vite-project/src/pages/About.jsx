const About = () =>{
    return(
        <>
        <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">About</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">A modern storefront system</h1>
          <p class="max-w-xl text-base leading-7 text-zinc-600">MarketLane is a static ecommerce frontend concept with
            real shopping flows across separate HTML pages.</p>
        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-7xl gap-5 px-5 md:grid-cols-3">
        <div class="tile"><strong>Curated</strong><span>Editorial product selection.</span></div>
        <div class="tile"><strong>Reliable</strong><span>Clear customer journeys.</span></div>
        <div class="tile"><strong>Responsive</strong><span>Mobile and desktop layouts.</span></div>
      </div>
    </section>
  </main>
        </>
    )
}

export default About