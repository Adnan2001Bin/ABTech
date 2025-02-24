import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";

import AuthLayout from "@/components/auth/layout"; // Updated to @ alias
import Login from "@/pages/auth/Login"; // Updated to @ alias
import Register from "@/pages/auth/Register"; // Updated to @ alias
import AdminLayout from "@/components/admin-view/Layout"; // Updated
import AdminAdditems from "@/pages/admin-view/add-items"; // Updated
import AdminListItems from "@/pages/admin-view/list-items"; // Updated
import AdminOrders from "@/pages/admin-view/orders"; // Updated
import ShoppingLayout from "@/components/shopping-view/layout"; // Updated
import NotFound from "@/pages/Not-Found"; // Updated
import ShoppingAccount from "@/pages/shopping-view/Account"; // Updated
import ShoppingCheckout from "@/pages/shopping-view/checkout"; // Updated
import ShoppingHome from "@/pages/shopping-view/home"; // Updated
import UnauthPage from "@/pages/unauth-page"; // Updated
import CheckAuth from "@/components/common/Check-Auth"; // Updated
import Collections from "@/pages/shopping-view/Collections"; // Updated
import Contact from "@/pages/shopping-view/Contact"; // Updated
import About from "@/pages/shopping-view/About"; // Updated
import ProductDetails from "@/components/shopping-view/Product-Details"; // Updated
import SuccessPage from "@/pages/shopping-view/Payment-success"; // Updated
import ReturnPage from "@/pages/shopping-view/Payment-return"; // Updated
import PaymentSuccessPage from "@/pages/shopping-view/Payment-return"; // Updated
import Paymentfailed from "@/pages/shopping-view/payment-failed"; // Updated

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        { path: "additems", element: <AdminAdditems /> },
        { path: "listItems", element: <AdminListItems /> },
        { path: "orders", element: <AdminOrders /> },
        { path: "additems/:id?", element: <AdminAdditems /> },
      ],
    },
    {
      path: "/",
      element: <ShoppingLayout />,
      children: [
        { path: "/", element: <ShoppingHome /> },
        { path: "account", element: <ShoppingAccount /> },
        { path: "checkout", element: <ShoppingCheckout /> },
        { path: "collections", element: <Collections /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
        { path: "sslcommerz-success", element: <PaymentSuccessPage /> },
        { path: "success", element: <SuccessPage /> },
        { path: "sslcommerz-fail", element: <Paymentfailed /> },
      ],
    },
    { path: "*", element: <NotFound /> },
    { path: "/unauth-page", element: <UnauthPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;