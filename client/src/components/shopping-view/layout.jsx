import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "@/pages/shopping-view/Footer";
function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ShoppingHeader />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;