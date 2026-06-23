import { useState } from "react";

import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import StatsCards from "../../components/admin/StatsCards";
import SalesOverview from "../../components/admin/SalesOverview";
import TrafficSources from "../../components/admin/TrafficSources";
import RecentOrders from "../../components/admin/RecentOrders";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        <main className="flex-1">
          <Navbar toggleSidebar={toggleSidebar} />

          <section className="p-4 md:p-8">
            <StatsCards />

            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              <SalesOverview />
              <TrafficSources />
            </div>

            <RecentOrders />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;