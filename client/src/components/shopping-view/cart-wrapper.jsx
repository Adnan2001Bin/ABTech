import React from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import UserCartItemsContent from './cart-items-content';

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Cart Items Section */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
          : <p className="text-center text-muted-foreground">Your cart is empty.</p>}
      </div>

      {/* Total and Checkout Section (Fixed at the Bottom) */}
      <div className="sticky bottom-0 bg-background pt-4 border-t">
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">TK{totalCartAmount.toFixed(2)}</span>
          </div>
        </div>
        <Button
          onClick={() => {
            navigate('/checkout');
            setOpenCartSheet(false);
          }}
          className="w-full mt-4"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;