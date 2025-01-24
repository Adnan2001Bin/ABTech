import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/Config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit() {}
  return (
    <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
      <h1 className="text-3xl font-semibold text-white text-center mb-3">
        Login
      </h1>
      <p className="text-center text-sm mb-5">Login to your accountt</p>
      <div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        <p className="text-gray-400 text-center text-xs mt-4">
          Don't have an account?{" "}
          <span className="text-blue-400 cursor-pointer underline">
          <Link to="/auth/register">Sign up</Link>
            
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
