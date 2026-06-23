import { useState } from "react";
import BuyerShell from "./BuyerShell";
import axios from "axios"
import { useEffect } from "react";

const BuyerDashboard = () => {
  
  const [totalOrders,setTotalOrders] = useState(0)
  const [list,setList] = useState([])
  const [totalActiveOrders,setTotalActiveOrders] = useState(0)
  const [totalAddress,setTotalAddress] = useState(0)
  const getDashboardData = async() =>{
    
    const token = localStorage.getItem("token")
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/buyer/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log("result",result.data.data.recentOrders)

      setList(result.data.data.recentOrders)
      setTotalActiveOrders(result.data.data.totalActiveOrder)
      setTotalAddress(result.data.data.totalAddress)
      setTotalOrders(result.data.data.totalOrders)
  }
useEffect(()=>{
getDashboardData()
},[])

console.log("tototo",totalActiveOrders)
  return (
    <BuyerShell
      eyebrow="Overview"
      title="Buyer dashboard"
      description="A quick snapshot of orders, payments, saved products, and live updates."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="stat">
          <strong>{totalOrders}</strong>
          <span>Total orders</span>
        </div>
        <div className="stat">
          <strong>{totalActiveOrders}</strong>
          <span>Active orders</span>
        </div>
        <div className="stat">
          <strong>8</strong>
          <span>Wishlist items</span>
        </div>
        <div className="stat">
          <strong>{totalAddress}</strong>
          <span>Saved addresses</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <section className="panel">
          <h2>Recent orders</h2>
          <div className="grid gap-3">
            {list.map((item)=>(
<div className="order-row">
              <div>
                <strong>#ORD-{item.id}</strong>
              
  {item.order_items.map((orderItem) => (
  <small key={orderItem.id}>
    {orderItem.Product.name} • {orderItem.quantity} item
  </small>
))}

              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                Shipped
              </span>
              <a className="btn-light" href="/buyer/orders/1024">
                View
              </a>
            </div>
            ))}
            
          </div>
        </section>

        <section className="panel">
          <h2>Live updates</h2>
          <ul className="steps">
            <li className="done">Order #ORD-1024 confirmed</li>
            <li className="done">Package packed by seller</li>
            <li className="done">Order shipped</li>
            <li>Out for delivery</li>
          </ul>
        </section>
      </div>
    </BuyerShell>
  );
};

export default BuyerDashboard;
