import axios from "axios"
import { useEffect, useState } from "react"

const AdminUser = () =>{
    const [users,setUsers] = useState([])
    const [totalUsers,setTotalUser] = useState(0)
    const [totalAdmin,setAdmin] = useState(0)
    const getUser = async() =>{
        try{
             const token = localStorage.getItem("token");
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
    console.log("result",result)

            setUsers(result.data.data)
            setTotalUser(result.data.totalUsers)
            setAdmin(result.data.totalAdmins)
        }catch(error){
            console.log(error)
         
        }
    }


    useEffect(()=>{
        getUser()
    },[])

return(
    <>


            <section className="grid gap-4 p-5 md:grid-cols-4 lg:p-8">
        <div className="rounded-md bg-white p-5">
          <p className="text-sm font-bold text-slate-500">Customers</p>
          <p className="text-3xl font-black">{totalUsers}</p>
        </div>
        <div className="rounded-md bg-white p-5">
          <p className="text-sm font-bold text-slate-500">VIP</p>
          <p className="text-3xl font-black">428</p>
        </div>
        <div className="rounded-md bg-white p-5">
          <p className="text-sm font-bold text-slate-500">Wholesale</p>
          <p className="text-3xl font-black">86</p>
        </div>
        <div className="rounded-md bg-white p-5">
          <p className="text-sm font-bold text-slate-500">Admins</p>
          <p className="text-3xl font-black">{totalAdmin}</p>
        </div>
      </section>
      <section className="px-5 pb-8 lg:px-8">
        <div className="overflow-x-auto rounded-md bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">User</th>
                <th>Role</th>
                <th>Orders</th>
                <th>Spend</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
  <tr key={user.id}>
    <td className="px-5 py-4 font-black">
      {user.firstName}{user.lastName}
      <br />
      <span className="font-normal text-slate-500">
        {user.email}
      </span>
    </td>

    <td>{user.Role.name.toUpperCase()}</td>
    <td>{user.totalOrders}</td>
    <td>$4,820</td>
    <td>
      <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
        {user.status ? "Active" :"Inactive"}
      </span>
    </td>
  </tr>
))}
             
              {/* <tr>
                <td className="px-5 py-4 font-black">Sara Khan<br /><span
                    className="font-normal text-slate-500">sara@example.com</span></td>
                <td>Wholesale</td>
                <td>31</td>
                <td>$12,240</td>
                <td><span className="rounded bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">Active</span></td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-black">Mira Kapoor<br /><span
                    className="font-normal text-slate-500">mira@example.com</span></td>
                <td>Support Admin</td>
                <td>0</td>
                <td>$0</td>
                <td><span className="rounded bg-sky-50 px-2 py-1 text-xs font-black text-sky-700">Staff</span></td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </section>
    </>
)
}


export default AdminUser