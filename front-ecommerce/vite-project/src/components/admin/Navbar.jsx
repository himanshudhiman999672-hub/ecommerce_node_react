const AdminNavbar = () => {
  return (
 <>
    <header class="border-b border-slate-200 bg-white px-5 py-5 lg:px-8">
          <p class="text-xs font-black uppercase tracking-wide text-slate-400">Store command center</p>
          <div class="mt-1 flex flex-wrap items-center justify-between gap-4">
            <div><h1 class="text-2xl font-black">Dashboard</h1><p class="text-sm text-slate-500">Overview of sales, orders, customers, inventory, and operations.</p></div>
            <input class="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none sm:w-80" placeholder="Search admin..." />
          </div>
        </header>
 </>
  );
};

export default AdminNavbar;