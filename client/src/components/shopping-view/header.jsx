import React from 'react'
import { Link } from 'react-router-dom'
import NavItems from './NavItems'
import HeaderRightContent from './HeaderRightContent'

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b-2 mx-12">
      <div className="flex items-center gap-36 px-4 md:px-6 h-20">
        <Link to="/" className=" cursor-pointer">
          <img className="w-48 h-22 lg:w-48" src="/src/assets/B-TECH.png" alt="" />
        </Link>

        <div >
          <NavItems />
        </div>

        <div>
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader
