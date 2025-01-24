import React, { useState } from "react";
import AuthLayout from "./components/auth/layout";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/layout";
import AdminAdditems from "./pages/admin-view/add-items";
import AdminListItems from "./pages/admin-view/list-items";
import AdminOrders from "./pages/admin-view/orders";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/Not-Found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/Check-Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const user = null

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
      ],
    },
    {
      path: "/shop",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      ),
      children: [
        { path: "home", element: <ShoppingHome /> },
        { path: "account", element: <ShoppingAccount /> },
        { path: "checkout", element: <ShoppingCheckout /> },
        { path: "listing", element: <ShoppingListing /> },
      ],
    },
    // Define the root path explicitly
    {
      path: "/",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          {/* Redirect based on authentication */}
          {isAuthenticated ? (
            user?.role === "admin" ? (
              <Navigate to="/admin/additems" />
            ) : (
              <Navigate to="/shop/home" />
            )
          ) : (
            <Navigate to="/auth/login" />
          )}
        </CheckAuth>
      ),
    },
    { path: "*", element: <NotFound /> },
    { path: "/unauth-page", element: <UnauthPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
