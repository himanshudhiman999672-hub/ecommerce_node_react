const Faq = () =>{
    return(
        <>
          <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">FAQ</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Common questions</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-4xl gap-4 px-5">
        <div class="panel">
          <h2>How long does shipping take?</h2>
          <p>Usually 2-5 business days.</p>
        </div>
        <div class="panel">
          <h2>Can I return items?</h2>
          <p>Yes, within 30 days in original condition.</p>
        </div>
        <div class="panel">
          <h2>Do you support exchanges?</h2>
          <p>Yes, start from the orders page.</p>
        </div>
        <div class="panel">
          <h2>Is this site JavaScript-free?</h2>
          <p>Yes, this frontend uses static HTML and CSS only.</p>
        </div>
      </div>
    </section>
  </main>
        </>
    )
}

export default Faq