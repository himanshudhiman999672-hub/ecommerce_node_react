import {Link} from "react-router-dom"

const AdminSidebar = () =>{
  return(
    <>
     
     <aside class="border-r border-slate-200 bg-white lg:min-h-screen lg:w-72">
        <div class="flex h-20 items-center gap-3 px-6">
          <div class="grid h-11 w-11 place-items-center rounded-md bg-slate-950 font-black text-white">C</div>
          <div><p class="text-lg font-black">CommerceOS</p><p class="text-sm text-slate-500">Admin panel</p></div>
        </div>
        <nav class="grid gap-1 px-4 pb-5">
          <Link to="/admin/dashboard" class="rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white">Dashboard</Link>
          <Link to="/admin/product" class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" >Products</Link>
          <Link to="/admin/category" class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100">Categories</Link>
          <Link to="/admin/subcategory" class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" href="subcategories.html">Subcategories</Link>
          <a class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" href="orders.html">Orders</a>
          <Link to="/admin/user" class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" >Users</Link>
          <a class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" href="inventory.html">Inventory</a>
          <a class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" href="payments.html">Payments</a>
          <a class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" href="marketing.html">Marketing</a>
          <a class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100" href="settings.html">Settings</a>
        </nav>
      </aside>


  
    </>
  )
}


export default AdminSidebar