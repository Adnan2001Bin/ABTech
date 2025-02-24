import { CirclePlus, Logs, BadgeCheck } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const adminSidebarMenuItems = [
  { id: "addItems", label: "Add Items", path: "/admin/additems", icon: <CirclePlus /> },
  { id: "listItems", label: "List Items", path: "/admin/listItems", icon: <Logs /> },
  { id: "orders", label: "Orders", path: "/admin/orders", icon: <BadgeCheck /> },
];

const MenuItems = () => {
  const location = useLocation();

  return (
    <nav className="mt-6 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <Link
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm sm:text-base text-muted-foreground hover:bg-muted hover:text-foreground ${
            location.pathname === menuItem.path ? "bg-emerald-200 text-foreground" : ""
          }`}
          key={menuItem.id}
          to={menuItem.path}
        >
          {menuItem.icon} <span>{menuItem.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-56 sm:w-64 flex-col border-r bg-background px-4 py-3 transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center text-emerald-700">
        <h1 className="text-lg sm:text-xl font-bold">Admin Panel</h1>
      </div>
      <MenuItems />
    </div>
  );
};

export default AdminSidebar;