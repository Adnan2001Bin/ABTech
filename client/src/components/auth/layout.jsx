// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="bg-orange-100 p-2 min-h-screen w-full flex items-center justify-center">
//       <div className="flex w-5/6 bg-white p-2 rounded-2xl shadow-md">
//         {/* Left section with the image */}
//         <div className="hidden lg:flex items-center justify-center w-1/2 rounded-l-xl">
//           <div className="w-full h-full relative rounded-l-xl">
//             <img
//               className="w-full h-[500px] object-cover rounded-l-xl"
//               src="https://res.cloudinary.com/dlqwzlbva/image/upload/v1737116858/AB-tech/basic/pv6ci02htrkccc0hyn0n.jpg"
//               alt=""
//             />

//             <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-l-xl font-font1">
//               <h1 className="text-3xl font-bold mb-2">
//                 Welcome Back to AB-TECH!
//               </h1>
//               <p className="text-center px-4">
//                 Sign in to access the latest gadgets, personalized
//                 recommendations, and your saved wishlist. Let’s get you back to
//                 exploring cutting-edge technology!
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right section with Outlet */}
//         <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
   <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout

