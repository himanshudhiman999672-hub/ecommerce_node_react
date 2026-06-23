import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const seller = JSON.parse(localStorage.getItem("user"));

  const getSellerOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await axiosInstance.get("/api/v1/seller/order");
      setOrders(result.data.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load seller orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerOrders();
  }, []);

  const stats = useMemo(() => {
    const uniqueOrderIds = new Set(orders.map((item) => item.order_id));
    const revenue = orders.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
    const pendingItems = orders.filter((item) => {
      const status = item.order?.order_status || item.Order?.order_status;
      return status === "pending" || status === "confirmed" || status === "packed";
    }).length;

    return {
      totalOrders: uniqueOrderIds.size,
      totalItems: orders.length,
      pendingItems,
      revenue,
    };
  }, [orders]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-emerald-700">
              Seller dashboard
            </p>
            <h1 className="mt-1 text-3xl font-black text-zinc-950">
              Welcome back{seller?.name ? `, ${seller.name}` : ""}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Track seller orders, revenue, and items that need attention.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/seller/support"
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-700"
            >
              Messages
            </a>
            <button
              onClick={getSellerOrders}
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white hover:bg-zinc-800"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6">
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <span className="text-sm font-bold text-zinc-500">Orders</span>
            <strong className="mt-2 block text-3xl font-black text-zinc-950">
              {stats.totalOrders}
            </strong>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <span className="text-sm font-bold text-zinc-500">Items sold</span>
            <strong className="mt-2 block text-3xl font-black text-zinc-950">
              {stats.totalItems}
            </strong>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <span className="text-sm font-bold text-zinc-500">Active items</span>
            <strong className="mt-2 block text-3xl font-black text-zinc-950">
              {stats.pendingItems}
            </strong>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <span className="text-sm font-bold text-zinc-500">Revenue</span>
            <strong className="mt-2 block text-3xl font-black text-zinc-950">
              Rs {stats.revenue.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 p-5">
            <h2 className="text-xl font-black text-zinc-950">Recent order items</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Items purchased from your store.
            </p>
          </div>

          {loading ? (
            <div className="p-5 text-sm font-semibold text-zinc-500">
              Loading seller orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-5 text-sm font-semibold text-zinc-500">
              No seller orders found yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Qty</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {orders.map((item) => {
                    const order = item.order || item.Order;
                    const product = item.Product || item.product;

                    return (
                      <tr key={item.id} className="hover:bg-zinc-50">
                        <td className="px-5 py-4 font-black text-zinc-950">
                          #{item.order_id}
                        </td>
                        <td className="px-5 py-4 text-zinc-700">
                          {product?.name || "Product"}
                        </td>
                        <td className="px-5 py-4 text-zinc-700">{item.quantity}</td>
                        <td className="px-5 py-4 text-zinc-700">
                          Rs {Number(item.price || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                            {order?.order_status || "pending"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-zinc-500">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString("en-IN")
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SellerDashboard;
