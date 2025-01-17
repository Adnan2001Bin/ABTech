import AuthLayout from "./components/auth/layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
