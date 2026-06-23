import { Outlet } from "react-router-dom"
import AdminFooter from "../components/admin/Footer"
import AdminSidebar from "../components/admin/Sidebar"
import AdminNavbar from "../components/admin/Navbar"
const AdminLayout = () =>{
    return(
        <>  
        <div class="min-h-screen lg:flex">

            <AdminSidebar />
              <main class="flex-1">
                    <AdminNavbar />
                  <Outlet />
            <AdminFooter />
              </main>

             </div>
        </>
       

    )   
}

export default AdminLayout