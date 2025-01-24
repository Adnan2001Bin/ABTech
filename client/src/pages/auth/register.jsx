// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/Config";
// import React, { useState } from "react";
// import {Link } from "react-router-dom";

// function Register() {
//   const [formData, setFormData] = useState(initialState);

//   function onSubmit(){}

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-2">
//           Already have an account
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>

//     </div>
//   );
// }

// export default Register;

import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/Config";
import { UserPen } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  useName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit() {}
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
