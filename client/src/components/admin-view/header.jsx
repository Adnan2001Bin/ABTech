import { logoutUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b shadow-sm md:px-6 lg:px-8">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Sidebar Toggle Button (Visible on Mobile/Tablet) */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center p-2 rounded-md text-muted-foreground hover:bg-muted md:hidden"
        >
          <AlignJustify size={20} />
        </button>
        {/* Logo */}
        <div onClick={() => navigate("/admin/additems")} className="cursor-pointer">
          <img
            className="w-28 sm:w-32 md:w-40"
            src="/src/assets/AB-TECH.png"
            alt="Logo"
          />
        </div>
      </div>
      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium shadow bg-gray-800 text-white hover:bg-gray-700"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;