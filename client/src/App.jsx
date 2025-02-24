import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";

import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/Layout";
import AdminAdditems from "./pages/admin-view/add-items";
import AdminListItems from "./pages/admin-view/list-items";
import AdminOrders from "./pages/admin-view/orders";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/Not-Found";
import ShoppingAccount from "./pages/shopping-view/Account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/Check-Auth";
import Collections from "./pages/shopping-view/Collections";
import Contact from "./pages/shopping-view/Contact";
import About from "./pages/shopping-view/About";
import ProductDetails from "./components/shopping-view/Product-Details";
import SuccessPage from "./pages/shopping-view/Payment-success";
import ReturnPage from "./pages/shopping-view/Payment-return";
import PaymentSuccessPage from "./pages/shopping-view/Payment-return";
import Paymentfailed from "./pages/shopping-view/payment-failed";
// import FailPage from "./pages/shopping-view/Payment-fail";
// import CancelPage from "./pages/shopping-view/Payment-cancel";

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
      { path: "sslcommerz-success", element: <PaymentSuccessPage /> }, // Use PaymentSuccessPage here
      { path: "success", element: <SuccessPage /> }, // Success page for displaying success message
      { path: "sslcommerz-fail", element: <Paymentfailed /> },
      ],
    },
    { path: "*", element: <NotFound /> },
    { path: "/unauth-page", element: <UnauthPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;