import React, { useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
     
      <AdminHeader setOpen={setSidebarOpen} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        {/* Main Content */}
        <main
          className={`flex-1 bg-muted/40 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
            isSidebarOpen ? "ml-64 sm:ml-0" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;