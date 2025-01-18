import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Helper function to check if the current route is for authentication
  const isAuthRoute = () =>
    location.pathname.includes("/login") || location.pathname.includes("/register");

  // Helper function to check if the current route is for admin
  const isAdminRoute = () => location.pathname.includes("/admin");

  // Helper function to check if the current route is for the shop
  const isShopRoute = () => location.pathname.includes("/shop");

  console.log(location.pathname, isAuthenticated);

  // Redirect unauthenticated users to login if trying to access protected routes
  if (!isAuthenticated && !isAuthRoute()) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from login/register to their respective dashboards
  if (isAuthenticated && isAuthRoute()) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/additems" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Restrict regular users from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && isAdminRoute()) {
    return <Navigate to="/unauth-page" />;
  }

  // Restrict admins from accessing shop-specific routes
  if (isAuthenticated && user?.role === "admin" && isShopRoute()) {
    return <Navigate to="/admin/additems" />;
  }

  // Handle root path logic
  if (location.pathname === "/") {
    return isAuthenticated ? (
      user?.role === "admin" ? (
        <Navigate to="/admin/additems" />
      ) : (
        <Navigate to="/shop/home" />
      )
    ) : (
      <Navigate to="/auth/login" />
    );
  }

  // Render the children if no redirects are required
  return <div>{children}</div>;
}

export default CheckAuth;
