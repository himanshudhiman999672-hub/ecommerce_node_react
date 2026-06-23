import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { io } from "socket.io-client";

const token = localStorage.getItem("token");
const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token,
  },
});

const SellerSupport = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const seller = JSON.parse(localStorage.getItem("user"));
  const sellerId = seller?.id;

  const getOrderItems = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await axiosInstance.get("/api/v1/seller/order");
      console.log("result",result)
      setOrderItems(result.data.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load seller messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderItems();
  }, []);

  useEffect(() => {
    socket.on("new_message", (data) => {
      setMessages((prev) => {
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

  const selectOrderItem = async (item) => {
    try {
      setSelectedItem(item);
      setMessages([]);
      setError("");

      const result = await axiosInstance.get(
        `/api/v1/conversation/order/${item.order_id}/item/${item.id}/messages`
      );


      
      setMessages(result.data.data || []);

      const conversationId = result.data.conversationId;

      if (conversationId) {
        socket.emit("join_conversation", conversationId);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load messages");
    }
  };

  const sendMessage = async () => {
    if (!selectedItem) {
      return alert("Please select an order item");
    }

    if (!message.trim()) {
      return alert("Please type a message");
    }

    try {
      setSending(true);

      const result = await axiosInstance.post(
        `/api/v1/sellerconversation/order/${selectedItem.order_id}/item/${selectedItem.id}`,
        {
          message,
        }
      );

      setMessage("");
      socket.emit("join_conversation", result.data.data.conversation_id);
      await selectOrderItem({
        ...selectedItem,
        conversation_id: result.data.data.conversation_id,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Unable to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-emerald-700">
              Seller support
            </p>
            <h1 className="mt-1 text-3xl font-black text-zinc-950">
              Buyer messages
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Reply to buyers for a specific order item.
            </p>
          </div>

          <a
            href="/seller/dashboard"
            className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white hover:bg-zinc-800"
          >
            Dashboard
          </a>
        </div>
      </section>

      <section className="mx-auto grid min-h-[72vh] max-w-7xl gap-5 px-5 py-6 lg:grid-cols-[20rem_1fr]">
        <aside className="rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 p-4">
            <h2 className="text-lg font-black text-zinc-950">Order items</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Choose one item to open chat.
            </p>
          </div>

          {loading ? (
            <div className="p-4 text-sm font-semibold text-zinc-500">
              Loading orders...
            </div>
          ) : orderItems.length === 0 ? (
            <div className="p-4 text-sm font-semibold text-zinc-500">
              No seller order items found.
            </div>
          ) : (
            <div className="max-h-[66vh] overflow-y-auto p-3">
              {orderItems.map((item) => {
                const product = item.Product || item.product;
                const order = item.order || item.Order;
                const active = selectedItem?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => selectOrderItem(item)}
                    className={`mb-2 w-full rounded-lg p-3 text-left ${
                      active ? "bg-emerald-50" : "hover:bg-zinc-50"
                    }`}
                  >
                    <strong className="block text-sm text-zinc-950">
                      {product?.name || "Product"}
                    </strong>
                    <small className="mt-1 block text-zinc-500">
                      Order #{item.order_id} • Item #{item.id}
                    </small>
                    <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-600">
                      {order?.order_status || "pending"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        <div className="flex min-h-[72vh] flex-col rounded-lg border border-zinc-200 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-200 p-4">
            <div>
              <h2 className="text-lg font-black text-zinc-950">
                {selectedItem
                  ? selectedItem.Product?.name || selectedItem.product?.name || "Order chat"
                  : "Select an order item"}
              </h2>
              <p className="text-sm text-zinc-500">
                {selectedItem
                  ? `Order #${selectedItem.order_id} • Item #${selectedItem.id}`
                  : "Messages will appear here"}
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              Seller
            </span>
          </div>

          {error && (
            <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="flex-1 space-y-4 overflow-y-auto bg-zinc-50 p-4">
            {messages.length === 0 ? (
              <div className="rounded-lg bg-white p-4 text-sm text-zinc-500 shadow-sm">
                {selectedItem
                  ? "No messages yet for this order item."
                  : "Select an order item from the left side."}
              </div>
            ) : (
              messages.map((item) => {
                const isMine = item.sender_id === sellerId;

                return (
                  <div
                    key={item.id}
                    className={`max-w-[75%] rounded-lg p-3 shadow-sm ${
                      isMine
                        ? "ml-auto rounded-tr-none bg-emerald-600 text-white"
                        : "rounded-tl-none bg-white text-zinc-800"
                    }`}
                  >
                    <p className="text-sm">{item.message}</p>
                    <span
                      className={`mt-1 block text-xs ${
                        isMine ? "text-emerald-100" : "text-zinc-400"
                      }`}
                    >
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-zinc-200 p-4">
            <div className="flex items-center gap-3">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={!selectedItem}
                className="min-w-0 flex-1 rounded-full border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:bg-zinc-100"
                placeholder={
                  selectedItem ? "Type your reply..." : "Select an order item first"
                }
              />

              <button
                onClick={sendMessage}
                disabled={!selectedItem || sending}
                className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SellerSupport;
