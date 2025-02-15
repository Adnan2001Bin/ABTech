import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Redirect unauthenticated users to the login page if they try to access protected routes
  // if (
  //   !isAuthenticated &&
  //   (location.pathname.includes("/about") ||
  //     location.pathname.includes("/doctorslist") ||
  //     location.pathname.includes("/contact") ||
  //     location.pathname.includes("/my-profile") ||
  //     location.pathname.includes("/my-appoinments") ||
  //     location.pathname.includes("/appoinments"))
  // ) {
  //   return <Navigate to="/auth/login" />;
  // }

  if (
    !isAuthenticated &&
    (location.pathname.includes("/admin"))
  ) {
    return <Navigate to="/auth/login" />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    // Redirect authenticated users away from login/register pages to their respective dashboards
    if (user && user.role === "admin") {
      return <Navigate to="/admin/additems" />;
    } else {
      return <Navigate to="/" />;
    }
  }


  // Prevent users from accessing routes meant for other roles
  if (isAuthenticated && user) {
    if (user.role === "admin" && !location.pathname.includes("/admin")) {
      return <Navigate to="/admin/additems" />;
    } else if (
      user.role === "user" &&
      (location.pathname.includes("/admin") )
    ) {
      return <Navigate to="/unauth-page" />;
    }
  }

  // Allow access to the requested route if all checks pass
  return <div>{children}</div>;
}

export default CheckAuth;
