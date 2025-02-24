import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/Config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = { userName: "", email: "", password: "" };

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccessToast = () => {
    toast.success("Registration successful!", { position: "top-center" });
  };

  const handleErrorToast = (message) => {
    toast.error(message || "Something went wrong.", { position: "top-center" });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        handleSuccessToast();
        setTimeout(() => navigate("/auth/login"), 2000);
      } else handleErrorToast(data?.payload?.message);
    });
  };

  return (
    <div className="bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-indigo-300 text-sm">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-3 sm:mb-4">
        Create Account
      </h1>
      <p className="text-center text-xs sm:text-sm mb-4 sm:mb-5">Create your account</p>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        formClassName="space-y-4"
        inputClassName="bg-[#333A5C] text-white text-xs sm:text-sm"
        buttonClassName="w-full py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium transition duration-300 hover:from-indigo-400 hover:to-indigo-800"
        labelClassName="text-white text-xs sm:text-sm"
      />
      <p className="text-gray-400 text-center text-xs sm:text-sm mt-3 sm:mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-400 underline hover:text-blue-300">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;