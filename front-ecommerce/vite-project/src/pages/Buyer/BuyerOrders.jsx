import { useState } from "react";
import BuyerShell from "./BuyerShell";
import { useEffect } from "react";
import axios from "axios"
const BuyerOrders = () => {
const [orders,setOrders] = useState([])

  const token = localStorage.getItem("token")

  const getOrders = async() =>{
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/buyer/dashboard`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })

      console.log("resut",result.data.data.totalOrdersNew)
      setOrders(result.data.data.totalOrdersNew)
    
  }

  useEffect(()=>{
    getOrders()
  },[])
  return (
    <BuyerShell
      eyebrow="Orders"
      title="My orders"
      description="Track current purchases, review old orders, cancel pending orders, or buy again."
    >
      <div className="grid gap-4">
      
  {orders.map((item) => (
  <div className="order-row" key={item.id}>
    <div>
      <strong>Order #{item.id}</strong>

      <small>
        Placed on {new Date(item.createdAt).toLocaleDateString()} •{" "}
        {item.order_items.length} items • ₹{item.total_price}
      </small>

      {item.order_items.map((orderItem) => (
        <p key={orderItem.id}>
          {orderItem.Product.name} × {orderItem.quantity}
        </p>
      ))}
    </div>

    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-800">
      {item.order_status}
    </span>

    <a className="btn-light" href={`/buyer/orders/${item.id}`}>
      Details
    </a>
  </div>
))}
      
      
      </div>
    </BuyerShell>
  );
};

export default BuyerOrders;
