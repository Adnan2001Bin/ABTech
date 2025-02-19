
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "@/pages/shopping-view/Footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col  overflow-hidden min-h-screen">
      <div className="w-full block ">
        <ShoppingHeader />
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default ShoppingLayout;
