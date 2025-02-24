import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/Config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = { email: "", password: "" };

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSuccessToast = () => {
    toast.success("Login successful!", { position: "top-center", autoClose: 2000 });
  };

  const handleErrorToast = (message) => {
    toast.error(message || "Something went wrong.", { position: "top-center" });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) handleSuccessToast();
      else handleErrorToast(data?.payload?.message);
    });
  };

  return (
    <div className="bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-indigo-300 text-sm">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-3 sm:mb-4">
        Login
      </h1>
      <p className="text-center text-xs sm:text-sm mb-4 sm:mb-5">Login to your account</p>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        formClassName="space-y-4"
        inputClassName="bg-[#333A5C] text-white text-xs sm:text-sm"
        buttonClassName="w-full py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium transition duration-300 hover:from-indigo-400 hover:to-indigo-800"
        labelClassName="text-white text-xs sm:text-sm"
      />
      <p className="text-gray-400 text-center text-xs sm:text-sm mt-3 sm:mt-4">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-blue-400 underline hover:text-blue-300">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;