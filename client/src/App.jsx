import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/Check-Auth";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   console.log("user " ,user);

//   useEffect(() => {
//     dispatch(checkAuth()).then((res) => {
//       console.log("CheckAuth dispatched:", res);
//     });
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

//   const router = createBrowserRouter([
//     {
//       path: "/auth",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <AuthLayout />
//         </CheckAuth>
//       ),
//       children: [
//         { path: "login", element: <Login /> },
//         { path: "register", element: <Register /> },
//       ],
//     },
//     {
//       path: "/admin",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <AdminLayout />
//         </CheckAuth>
//       ),
//       children: [
//         { path: "additems", element: <AdminAdditems /> },
//         { path: "listItems", element: <AdminListItems /> },
//         { path: "orders", element: <AdminOrders /> },
//       ],
//     },
//     {
//       path: "/shop",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <ShoppingLayout />
//         </CheckAuth>
//       ),
//       children: [
//         { path: "home", element: <ShoppingHome /> },
//         { path: "account", element: <ShoppingAccount /> },
//         { path: "checkout", element: <ShoppingCheckout /> },
//         { path: "listing", element: <ShoppingListing /> },
//       ],
//     },
//     { path: "*", element: <NotFound /> },
//     { path: "/unauth-page", element: <UnauthPage /> },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;

// import React, { useEffect } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "./components/ui/skeleton";

// import AuthLayout from "./components/auth/layout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminProducts from "./pages/admin-view/products";
// import AdminOrders from "./pages/admin-view/orders";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/Not-Found";
// import ShoppingAccount from "./pages/shopping-view/account";
// import ShoppingCart from "./pages/shopping-view/cart";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingHome from "./pages/shopping-view/home";
// import ProductDetail from "./pages/shopping-view/product-detail";
// import UnauthPage from "./pages/unauth-page";
// import CheckAuth from "./components/common/Check-Auth";

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
      path: "/",
      element: <ShoppingHome />,
    },
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
    { path: "*", element: <NotFound /> },
    { path: "/unauth-page", element: <UnauthPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
