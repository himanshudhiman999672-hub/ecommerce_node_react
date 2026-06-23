const Address = () =>{
    return(
        <>
          <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Addresses</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Saved delivery places</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-5xl gap-5 px-5 md:grid-cols-2">
        <div class="panel">
          <h2>Home</h2>
          <p>42 Commerce Street, New Delhi 110001</p><a class="btn-light mt-4" href="checkout.html">Use address</a>
        </div>
        <div class="panel">
          <h2>Office</h2>
          <p>8 Studio Park, Gurugram 122001</p><a class="btn-light mt-4" href="checkout.html">Use address</a>
        </div>
      </div>
    </section>
  </main>
        </>
    )
}

export default Address