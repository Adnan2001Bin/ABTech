import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, LogOut, Search, ShoppingBag, SquareUserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sheet } from "../ui/sheet";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();

  const numberOfCartItems = cartItems?.items?.length || 0;

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/");
  }

  useEffect(() => {
    if (user?._id) dispatch(fetchCartItems(user._id));
  }, [dispatch, user?._id]);

  return (
    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
      <div className="flex items-center gap-1 sm:gap-2 border px-2 sm:px-3 py-1 rounded-2xl w-32 sm:w-40 lg:w-48">
        <Search className="w-4 h-4" />
        <Input
          style={{ border: "none", boxShadow: "none" }}
          placeholder="Search"
          className="text-xs sm:text-sm"
        />
      </div>
      <DropdownMenu>
        <div className="flex items-center gap-1">
          <DropdownMenuTrigger asChild>
            <SquareUserRound className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuTrigger asChild>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" />
          </DropdownMenuTrigger>
        </div>
        {user ? (
          <DropdownMenuContent side="bottom" className="w-40 sm:w-48 lg:w-56 shadow-lg rounded-md">
            <DropdownMenuLabel className="text-xs sm:text-sm">
              Logged in as {user?.userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account")} className="cursor-pointer text-xs sm:text-sm">
              <SquareUserRound className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-xs sm:text-sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent side="bottom" className="w-40 sm:w-48 py-2 shadow-lg rounded-md">
            <div className="text-center">
              <p className="mb-2 font-semibold text-xs sm:text-sm">Hi User!</p>
              <Button
                onClick={() => navigate("/auth/login")}
                className="w-full sm:w-40 text-xs sm:text-sm"
              >
                Login
              </Button>
            </div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <div onClick={() => setOpenCartSheet(true)} className="relative cursor-pointer">
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          {numberOfCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {numberOfCartItems}
            </span>
          )}
        </div>
        <UserCartWrapper cartItems={cartItems?.items || []} setOpenCartSheet={setOpenCartSheet} />
      </Sheet>
    </div>
  );
};

export default HeaderRightContent;