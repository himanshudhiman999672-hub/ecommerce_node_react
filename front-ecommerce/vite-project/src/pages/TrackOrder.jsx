const TrackOrder = ()=>{
return(
    <>
         <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Track order</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Follow a package</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-5xl gap-6 px-5 md:grid-cols-2">
        <form class="panel">
          <h2>Enter details</h2><input placeholder="Order number" /><input placeholder="Email or phone"/><a
            class="btn-dark mt-3" href="order-detail.html">Track</a>
        </form>
        <div class="panel">
          <h2>Live status</h2>
          <ol class="steps">
            <li class="done">Order placed</li>
            <li class="done">Packed</li>
            <li>In transit</li>
            <li>Delivered</li>
          </ol>
        </div>
      </div>
    </section>
  </main>
    </>
)
}

export default TrackOrder