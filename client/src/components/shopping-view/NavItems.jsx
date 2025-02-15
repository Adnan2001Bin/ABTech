import { userViewNavItems } from "@/Config";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-10 lg:flex-row relative">
      {userViewNavItems.map((navItem) => (
        <div key={navItem.id} className="hidden h-8 md:flex items-start gap-5">
          <NavLink
            to={navItem.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "font-extrabold" : "text-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p className="text-sm font-semibold ">{navItem.label}</p>
                <hr
                  className={`w-2/4 border-none h-0.5 bg-gray-700 ${
                    isActive ? "animate-slideIn" : "opacity-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default NavItems;