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

  // Toast messages
  const handleSuccessToast = () => {
    toast.success("Login Account successful!...", {
      position: "top-center",
      autoClose:2000

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
          formClassName="space-y-4" // Custom form class
          inputClassName="bg-[#333A5C] text-white" // Custom input class
          buttonClassName="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium mt-5 
    transition duration-300 ease-in-out transform hover:scale-100 hover:from-indigo-400 hover:to-indigo-800 
    will-change-transform " // Custom button class
          labelClassName="text-white" // Custom label class
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
