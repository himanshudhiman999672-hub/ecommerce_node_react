import { useEffect, useState } from "react";
import BuyerShell from "./BuyerShell";
import axios from "axios"
import { io } from "socket.io-client";

const token = localStorage.getItem("token");
const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token,
  },
});

const BuyerSupport = () => {
const [order,setOrder] = useState([])
const [message,setMessage] = useState([])
const [formData,setFormData] = useState({
  message:""
})

const [selectedOrder, setSelectedOrder] = useState(null);
const [selectedOrderItem, setSelectedOrderItem] = useState(null);

const API_URL = `${import.meta.env.VITE_API_URL}`
const authUser = JSON.parse(localStorage.getItem("user"));
console.log("authUSr",authUser)
const authUserId = authUser?.id;


  const getOrder = async ()=>{

  const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  setOrder(result.data.data)
  }

  const getMessage = async(conversationId)=>{
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/conversation/${conversationId}/messages`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  console.log("result",result.data.data)
  setMessage(result.data.data)
  }

 
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

const selectOrderItem = async (orderData, orderItem) => {
  setSelectedOrder(orderData);
  setSelectedOrderItem(orderItem);
  setMessage([]);

  const result = await axios.get(
    `${API_URL}/api/v1/conversation/order/${orderData.id}/item/${orderItem.id}/messages`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  setMessage(result.data.data)

  const conversationId = result.data.conversationId;

  if (conversationId) {
    socket.emit("join_conversation", conversationId);
  }
}

const postMessage = async() =>{
  if (!selectedOrder || !selectedOrderItem) {
    return alert("Please select an order item first");
  }

  if (!formData.message.trim()) {
    return alert("Please type a message");
  }

  const url =
    authUser.role == "buyer" || authUser.role == "admin"
      ? `${API_URL}/api/v1/conversation/order/${selectedOrder.id}/item/${selectedOrderItem.id}`
      : `${API_URL}/api/v1/sellerconversation/order/${selectedOrder.id}/item/${selectedOrderItem.id}`;

  const result = await axios.post(url,{
    message: formData.message
  },{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  const conversationId = result.data.data.conversation_id;
if (conversationId) {
  socket.emit("join_conversation", conversationId);
}
  setFormData({ message: "" });
  getMessage(conversationId);
}


useEffect(()=>{
getOrder()
},[])

useEffect(() => {
  socket.on("new_message", (data) => {
    setMessage((prev) => {
      const exists = prev.some((item) => item.id === data.message.id);

      if (exists) {
        return prev;
      }

      return [...prev, data.message];
    });
  });

  return () => {
    socket.off("new_message");
  };
}, []);

  return (
    <BuyerShell>
      <section className="grid min-h-[70vh] gap-5 lg:grid-cols-[18rem_1fr]">
  {/* Support sidebar */}
  <aside className="rounded-lg border border-zinc-200 bg-white p-4">
    <div className="border-b border-zinc-200 pb-4">
      <p className="text-xs font-black uppercase text-emerald-700">
        Support
      </p>
      <h2 className="mt-1 text-xl font-black text-zinc-950">
        Conversations
      </h2>
    </div>

    <div className="mt-4 grid gap-3">
    {order.map((item)=>(
      <div key={item.id} className="rounded-lg border border-zinc-100 p-2">
        <strong className="block px-1 text-sm text-zinc-950">Order #{item.id}</strong>
        <div className="mt-2 grid gap-2">
          {item.order_items?.map((orderItem) => (
            <button
              key={orderItem.id}
              onClick={() => selectOrderItem(item, orderItem)}
              className={`rounded-lg p-3 text-left ${
                selectedOrderItem?.id === orderItem.id
                  ? "bg-emerald-50"
                  : "hover:bg-zinc-50"
              }`}
            >
              <strong className="block text-sm text-zinc-950">
                {orderItem.Product?.name || "Order item"}
              </strong>
              <small className="text-zinc-500">
                Qty {orderItem.quantity} • Order item #{orderItem.id}
              </small>
            </button>
          ))}
        </div>
      </div>
    ))}
     

      {/* <button className="rounded-lg p-3 text-left hover:bg-zinc-50">
        <strong className="block text-sm text-zinc-950">Payment support</strong>
        <small className="text-zinc-500">Refund request</small>
      </button> */}
    </div>
  </aside>

  {/* Chat area */}
  <div className="flex min-h-[70vh] flex-col rounded-lg border border-zinc-200 bg-white">
    {/* Chat header */}
    <div className="flex items-center justify-between border-b border-zinc-200 p-4">
      <div>
        <h2 className="text-lg font-black text-zinc-950">Order Support</h2>
        <p className="text-sm text-zinc-500">
          {selectedOrder && selectedOrderItem
            ? `Order #${selectedOrder.id} • Item #${selectedOrderItem.id}`
            : "Select an order item to start chat"}
        </p>
      </div>

      <div className="flex gap-2">
        {/* <button className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-700 hover:bg-zinc-200">
          Voice call
        </button>
        <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
          Video call
        </button> */}
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 space-y-4 overflow-y-auto bg-zinc-50 p-4">
        
        
      {message.map((item) => {
  const isMine = item.sender_id === authUserId;

  return (
    <div
      key={item.id}
      className={`max-w-[75%] rounded-lg p-3 shadow-sm ${
        isMine
          ? "ml-auto rounded-tr-none bg-emerald-600 text-white"
          : "rounded-tl-none bg-white text-zinc-800"
      }`}
    >
      <span
        className={`mb-1 block text-xs ${
          isMine ? "text-emerald-100" : "text-zinc-400"
        }`}
      >
        {new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>

      <p className="text-sm">{item.message}</p>

      <span
        className={`mt-1 block text-xs ${
          isMine ? "text-emerald-100" : "text-zinc-400"
        }`}
      >
        {new Date(item.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    </div>
  );
})}

{message.length === 0 && (
  <div className="rounded-lg bg-white p-4 text-sm text-zinc-500 shadow-sm">
    {selectedOrderItem
      ? "No messages yet. Send your first message for this order item."
      : "Select an order item from the left side."}
  </div>
)}

{/* 
      <div className="ml-auto max-w-[75%] rounded-lg rounded-tr-none bg-emerald-600 p-3 text-white shadow-sm">
        <p className="text-sm">
          My order status is packed but tracking is not updating.
        </p>
        <span className="mt-1 block text-xs text-emerald-100">10:25 AM</span>
      </div>

      <div className="max-w-[75%] rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
        <p className="text-sm text-zinc-800">
          I checked it. Your order will be shipped soon.
        </p>
        <span className="mt-1 block text-xs text-zinc-400">10:26 AM</span>
      </div> */}
    </div>

    {/* Composer */}
    <div className="border-t border-zinc-200 p-4">
      <div className="flex items-center gap-3">
        {/* <button className="rounded-full bg-zinc-100 px-4 py-3 text-sm font-black text-zinc-700">
          +
        </button> */}

        <input
          className="min-w-0 flex-1 rounded-full border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message..."
        />

        {/* <button className="rounded-full bg-zinc-100 px-4 py-3 text-sm font-black text-zinc-700">
          Mic
        </button> */}

        <button
          onClick={postMessage}
          className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</section>
    </BuyerShell>
  );
};

export default BuyerSupport;
