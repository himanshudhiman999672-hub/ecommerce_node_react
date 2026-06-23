const Account = () =>{
return(
    <>
      <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Account</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Manage your shopping</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3"><a class="tile"
          href="profile.html"><strong>Profile</strong><span>Update name, email, and password</span></a><a class="tile"
          href="addresses.html"><strong>Addresses</strong><span>Saved shipping locations</span></a><a class="tile"
          href="payments.html"><strong>Payments</strong><span>Cards and billing details</span></a><a class="tile"
          href="wishlist.html"><strong>Wishlist</strong><span>Saved products</span></a><a class="tile"
          href="orders.html"><strong>Orders</strong><span>Order history and invoices</span></a><a class="tile"
          href="contact.html"><strong>Support</strong><span>Help center and contact</span></a></div>
    </section>
  </main>
    </>
)
}

export default Account