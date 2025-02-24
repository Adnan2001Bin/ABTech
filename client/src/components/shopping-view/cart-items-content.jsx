import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

const UserCartItemsContent = ({ cartItem }) => {
  const firstImage = cartItem?.images?.[0] || "";
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSuccessToast = (message) => {
    toast.success(message, { position: "top-center", autoClose: 2000 });
  };

  const handleUpdateQuantity = (typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?._id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) handleSuccessToast("Cart item updated successfully");
    });
  };

  const handleCartItemDelete = () => {
    dispatch(deleteCartItem({ userId: user?._id, productId: cartItem?.productId })).then(
      (data) => {
        if (data?.payload?.success) handleSuccessToast("Cart item deleted successfully");
      }
    );
  };

  return (
    <div className="flex items-center space-x-3 sm:space-x-4">
      <img
        src={firstImage}
        alt={cartItem?.title}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-sm sm:text-base">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full hover:bg-gray-100"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity("minus")}
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <span className="font-semibold text-sm sm:text-base">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full hover:bg-gray-100"
            size="icon"
            onClick={() => handleUpdateQuantity("plus")}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-sm sm:text-base">
          TK
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={handleCartItemDelete}
          className="cursor-pointer mt-1 text-red-500 hover:text-red-700"
          size={16}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;