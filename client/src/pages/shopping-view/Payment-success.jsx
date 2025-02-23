import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { clearCart, fetchCartItems } from "@/store/shop/cart-slice";
import { resetOrderList, capturePayment } from "@/store/shop/order-slice";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");
  const valId = searchParams.get("val_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("SuccessPage mounted");

    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

    if (tranId && valId && orderId) {
      // Call capturePayment to finalize the order
      dispatch(capturePayment({ paymentId: tranId, payerId: valId, orderId })).then((data) => {
        if (data?.payload?.success) {
          // Clear cart and reset orders
          dispatch(clearCart());
          dispatch(fetchCartItems(user?._id)); // Sync with backend
          dispatch(resetOrderList());
          sessionStorage.removeItem("currentOrderId");
        }
      });
    }

    // Redirect to orders page after a delay (optional)
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(timer);
      console.log("Session storage cleaned up");
    };
  }, [dispatch, navigate, tranId, valId, user?._id]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-2">Transaction ID: {tranId}</p>
        <p>Validation ID: {valId}</p>
        {cartItems?.items?.length > 0 && (
          <p className="text-red-500 mt-4">
            Note: Cart is being cleared. Remaining items: {cartItems.items.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;