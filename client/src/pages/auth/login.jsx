import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/Config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toast messages
  const handleSuccessToast = () => {
    toast.success("Login Account successful!...", {
      position: "top-center",
    });
  };

  const handleErrorToast = (message) => {
    toast.error(message || "Something went wrong. Please try again.", {
      position: "top-center",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        handleSuccessToast();
      } else {
        handleErrorToast(data?.payload?.message);
      }
    });
  };
  return (
    <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
      <h1 className="text-3xl font-semibold text-white text-center mb-3">
        Login
      </h1>
      <p className="text-center text-sm mb-5">Login to your account</p>
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
