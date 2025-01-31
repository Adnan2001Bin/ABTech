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

