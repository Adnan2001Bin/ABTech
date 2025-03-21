import React from "react";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import HeaderRightContent from "./HeaderRightContent";
import logo from "../../assets/B-TECH.png";

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b-2 shadow-sm mx-4 sm:mx-8 lg:mx-12 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 h-auto min-h-[80px] sm:min-h-[80px] lg:min-h-[90px] gap-4 sm:gap-6 lg:gap-10">
        {/* Logo */}
        <Link to="/" className="cursor-pointer">
          <img className="w-36 sm:w-40 lg:w-48 h-auto" src={logo} alt="Logo" />
        </Link>

        <Link
          to={"/admin/additems"}
          className="border-2 border-black rounded-xl w-28 h-9 flex justify-center items-center bg-gray-50 text-sm"
        >
          Admin Panel
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
