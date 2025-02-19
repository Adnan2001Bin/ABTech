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
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Search,
  ShoppingBag,
  SquareUserRound,
  User,
  UserCog,
} from "lucide-react";
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
    if (user?._id) {
      dispatch(fetchCartItems(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="flex items-center gap-4 ">
      <div className="flex items-center gap-2 border px-4 rounded-2xl">
        <Search />
        <Input
          style={{
            border: "none",
            boxShadow: "none",
          }}
          placeholder="Search"
        />
      </div>

      <div className="cursor-pointer">
        <DropdownMenu>
          <div className="flex items-center justify-between gap-1">
            <DropdownMenuTrigger asChild>
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuTrigger asChild>
              <ChevronDown className="w-4" />
            </DropdownMenuTrigger>
          </div>

          {user ? (
            <DropdownMenuContent side="bottom" className="w-56 ">
              <DropdownMenuLabel>
                Logged in as {user?.userName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/account")}
                className="cursor-pointer"
              >
              <SquareUserRound className="mr-2 h-6 w-6"/>
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent
              side="bottom"
              className="w-52 py-2 flex justify-center border-2"
            >
              <div>
                <p className="mb-2 font-semibold">Hi User!</p>
                <Button
                  onClick={() => navigate("/auth/login")}
                  className="w-40"
                >
                  Login
                </Button>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>

      <div>
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <div
            onClick={() => setOpenCartSheet(true)}
            className="relative cursor-pointer"
          >
            <ShoppingBag />
            {numberOfCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {numberOfCartItems}
              </span>
            )}
          </div>
          <UserCartWrapper
            cartItems={cartItems?.items || []}
            setOpenCartSheet={setOpenCartSheet}
          />
        </Sheet>
      </div>
    </div>
  );
};

export default HeaderRightContent;