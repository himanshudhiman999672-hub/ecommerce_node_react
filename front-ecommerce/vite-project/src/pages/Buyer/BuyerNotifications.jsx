import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import BuyerShell from "./BuyerShell";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1000";

const isUnreadNotification = (notification) => {
  return (
    notification.is_read === false ||
    notification.is_read === 0 ||
    notification.is_read === "0" ||
    notification.is_read === "false"
  );
};

const BuyerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const unreadCount = notifications.filter(isUnreadNotification).length;

  const token = localStorage.getItem("token");

  const getNotifications = async () => {
    const result = await axios.get(`${API_URL}/api/v1/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(result.data.data || []);
  };

  useEffect(() => {
    getNotifications();

    socketRef.current = io(API_URL, {
      auth: {
        token,
      },
    });

    socketRef.current.on("notification:new", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleViewNotification = async (notification) => {
    await axios.patch(
      `${API_URL}/api/v1/notifications/${notification.id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, is_read: true } : item
      )
    );

    if (notification.type === "order") {
      navigate(`/buyer/orders/${notification.order_id}`);
    }
  };

  return (
    <BuyerShell
      eyebrow="Notifications"
      title="Notifications"
      description="Live order and payment updates appear here."
    >
      <section className="panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2>Recent alerts</h2>

          <span className={`rounded-full px-3 py-1 text-sm font-black ${
            unreadCount > 0
              ? "bg-emerald-100 text-emerald-800"
              : "bg-zinc-100 text-zinc-500"
          }`}>
            {unreadCount} unread
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {notifications.length === 0 ? (
            <div className="order-row">
              <div>
                <strong>No new notifications</strong>
                <small>Your order and payment alerts will appear here.</small>
              </div>
            </div>
          ) : (
            notifications.map((item) => {
              const isUnread = isUnreadNotification(item);

              return (
                <div
                  className={`order-row border transition ${
                    isUnread
                      ? "border-emerald-200 bg-emerald-50 shadow-sm"
                      : "border-zinc-200 bg-white"
                  }`}
                  key={item.id}
                >
                  <div className="flex min-w-0 gap-3">
                    {isUnread && (
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                    )}

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className={isUnread ? "text-zinc-950" : "text-zinc-700"}>
                          {item.title}
                        </strong>

                        {isUnread && (
                          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-black uppercase text-white">
                            Unread
                          </span>
                        )}
                      </div>

                      <small className={isUnread ? "text-zinc-700" : "text-zinc-500"}>
                        {item.message}
                      </small>
                    </div>
                  </div>

                  <button
                    className={isUnread ? "btn-dark" : "btn-light"}
                    onClick={() => handleViewNotification(item)}
                  >
                    View order
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </BuyerShell>
  );
};

export default BuyerNotifications;
