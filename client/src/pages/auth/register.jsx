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

  // Toast messages
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
        setTimeout(() => navigate("/auth/login"), 2000); // Navigate after toast
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
