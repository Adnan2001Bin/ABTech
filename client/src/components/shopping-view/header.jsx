import React from "react";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import HeaderRightContent from "./HeaderRightContent";

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b-2 shadow-sm mx-4 sm:mx-8 lg:mx-12 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 h-auto min-h-[80px] sm:min-h-[80px] lg:min-h-[90px] gap-4 sm:gap-6 lg:gap-10">
        {/* Logo */}
        <Link to="/" className="cursor-pointer">
          <img
            className="w-36 sm:w-40 lg:w-48 h-auto"
            src="/src/assets/B-TECH.png"
            alt="Logo"
          />
        </Link>

        {/* NavItems and HeaderRightContent Container */}
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 sm:gap-6 lg:gap-10">
          <NavItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;