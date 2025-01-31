import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  



  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user && user.role === "admin") {
        return <Navigate to="/admin/additems" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user && user.role === "admin") {
      return <Navigate to="/admin/additems" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user &&
    user.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/additems" />;
  }
  return <div>{children}</div>;
}

export default CheckAuth;


// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // Redirect to login if not authenticated and trying to access protected routes
//   if (!isAuthenticated && location.pathname !== "/auth/login" && location.pathname !== "/auth/register") {
//     return <Navigate to="/auth/login" />;
//   }

//   // Redirect authenticated users away from login/register pages
//   if (isAuthenticated && (location.pathname === "/auth/login" || location.pathname === "/auth/register")) {
//     return <Navigate to="/" />;
//   }

//   // Redirect non-admin users trying to access admin routes
//   if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
//     return <Navigate to="/unauth-page" />;
//   }

//   // Redirect admin users away from shop routes
//   if (isAuthenticated && user?.role === "admin" && location.pathname.startsWith("/shop")) {
//     return <Navigate to="/admin/additems" />;
//   }

//   return <div>{children}</div>;
// }

// export default CheckAuth;