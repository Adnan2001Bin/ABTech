import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-lg rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;