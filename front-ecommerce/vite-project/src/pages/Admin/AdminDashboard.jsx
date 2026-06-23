const AdminDashboard = ()=>{
    return(
        <>
         <section class="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4 lg:p-8">
          <div class="rounded-md border border-slate-200 bg-white p-5"><p class="text-sm font-bold text-slate-500">Revenue</p><p class="mt-2 text-3xl font-black">$128.4K</p><span class="mt-4 inline-flex rounded bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">+18.2%</span></div>
          <div class="rounded-md border border-slate-200 bg-white p-5"><p class="text-sm font-bold text-slate-500">Orders</p><p class="mt-2 text-3xl font-black">2,846</p><span class="mt-4 inline-flex rounded bg-sky-50 px-3 py-1 text-sm font-black text-sky-700">+9.7%</span></div>
          <div class="rounded-md border border-slate-200 bg-white p-5"><p class="text-sm font-bold text-slate-500">Customers</p><p class="mt-2 text-3xl font-black">18,920</p><span class="mt-4 inline-flex rounded bg-violet-50 px-3 py-1 text-sm font-black text-violet-700">+12.4%</span></div>
          <div class="rounded-md border border-slate-200 bg-white p-5"><p class="text-sm font-bold text-slate-500">Pending</p><p class="mt-2 text-3xl font-black">134</p><span class="mt-4 inline-flex rounded bg-amber-50 px-3 py-1 text-sm font-black text-amber-700">Needs action</span></div>
        </section>
        <section class="grid gap-6 px-5 pb-8 xl:grid-cols-[1.5fr_1fr] lg:px-8">
          <div class="rounded-md border border-slate-200 bg-white">
            <div class="flex items-center justify-between border-b border-slate-200 p-5"><div><h2 class="text-lg font-black">Recent Products</h2><p class="text-sm text-slate-500">Top catalog items and stock state.</p></div><a class="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white" href="products.html">View all</a></div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[680px] text-left text-sm">
                <thead class="bg-slate-50 text-xs uppercase text-slate-500"><tr><th class="px-5 py-3">Product</th><th class="px-5 py-3">Category</th><th class="px-5 py-3">Stock</th><th class="px-5 py-3">Price</th><th class="px-5 py-3">Status</th></tr></thead>
                <tbody class="divide-y divide-slate-100">
                  <tr><td class="px-5 py-4 font-black">Aura Wireless Headphones</td><td class="px-5 py-4">Electronics</td><td class="px-5 py-4">248</td><td class="px-5 py-4">$129</td><td class="px-5 py-4"><span class="rounded bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">Active</span></td></tr>
                  <tr><td class="px-5 py-4 font-black">Linen Utility Jacket</td><td class="px-5 py-4">Fashion</td><td class="px-5 py-4">64</td><td class="px-5 py-4">$86</td><td class="px-5 py-4"><span class="rounded bg-amber-50 px-2 py-1 text-xs font-black text-amber-700">Low stock</span></td></tr>
                  <tr><td class="px-5 py-4 font-black">Ceramic Pour Over Set</td><td class="px-5 py-4">Home</td><td class="px-5 py-4">182</td><td class="px-5 py-4">$42</td><td class="px-5 py-4"><span class="rounded bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">Active</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="rounded-md border border-slate-200 bg-white p-5">
            <h2 class="text-lg font-black">Operations</h2>
            <div class="mt-4 grid gap-3">
              <a class="rounded-md border border-slate-200 p-4 hover:bg-slate-50" href="orders.html"><strong>42 orders</strong><p class="text-sm text-slate-500">Need packing or label generation.</p></a>
              <a class="rounded-md border border-slate-200 p-4 hover:bg-slate-50" href="inventory.html"><strong>28 stock alerts</strong><p class="text-sm text-slate-500">Below reorder level.</p></a>
              <a class="rounded-md border border-slate-200 p-4 hover:bg-slate-50" href="payments.html"><strong>7 disputes</strong><p class="text-sm text-slate-500">Waiting for review.</p></a>
            </div>
          </div>
        </section>
        </>
    )
} 

export default AdminDashboard