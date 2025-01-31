import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/Config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccessToast = () => {
    toast.success("Registration successful!...", {
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
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        handleSuccessToast();
        setTimeout(() => navigate("/auth/login"), 2000);
      } else {
        handleErrorToast(data?.payload?.message);
      }
    });
  };

  return (
    <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
      <h1 className="text-3xl font-semibold text-white text-center mb-3">
        Create Account
      </h1>
      <p className="text-center text-sm mb-5">Create your account</p>
      <div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
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
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer underline">
            <Link to="/auth/login">Login here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
