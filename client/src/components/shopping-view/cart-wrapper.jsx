import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const isCheckoutDisabled = !cartItems || cartItems.length === 0;

  return (
    <SheetContent className="w-full max-w-xs sm:max-w-md flex flex-col">
      <SheetHeader>
        <SheetTitle className="text-lg sm:text-xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto mt-3 sm:mt-4 space-y-3 sm:space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
        ) : (
          <p className="text-center text-muted-foreground text-sm sm:text-base">
            Your cart is empty.
          </p>
        )}
      </div>
      <div className="sticky bottom-0 bg-background pt-3 sm:pt-4 border-t">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-bold">Total</span>
          <span className="font-bold">TK{totalCartAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700"
          disabled={isCheckoutDisabled}
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;