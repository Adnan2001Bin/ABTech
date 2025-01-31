import {
  BadgeCheck,
  ChartNoAxesCombined,
  CirclePlus,
  LayoutDashboard,
  Logs,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "addItems",
    label: "Add Items",
    path: "/admin/additems",
    icon: <CirclePlus />,
  },
  {
    id: "listItems",
    label: "List Items",
    path: "/admin/listItems",
    icon: <Logs />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const MenuItems = () => {
  const location = useLocation(); // Get the current path

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <Link
          className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground outline ${
            location.pathname === menuItem.path
              ? "bg-emerald-200 text-foreground" // Active link style
              : ""
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
      className={`fixed lg:relative w-64 flex-col border-r bg-background px-6 py-3 lg:flex ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex text-emerald-700">
        <ChartNoAxesCombined size={25} />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <MenuItems />
    </div>
  );
};

export default AdminSidebar;