import { userViewNavItems } from "@/Config";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItems = () => {
  return (
    <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
      {userViewNavItems.map((navItem) => (
        <NavLink
          key={navItem.id}
          to={navItem.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs sm:text-sm font-semibold ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span>{navItem.label}</span>
              <hr
                className={`w-2/4 border-none h-0.5 bg-blue-600 ${
                  isActive ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavItems;