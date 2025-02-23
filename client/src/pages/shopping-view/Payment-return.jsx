import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";
import { clearCart, fetchCartItems } from "@/store/shop/cart-slice";
import { resetOrderList } from "@/store/shop/order-slice";

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      if (orderId) {
        dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
          if (data?.payload?.success) {
            // Clear cart in Redux and fetch updated cart
            dispatch(clearCart());
            dispatch(fetchCartItems(user?._id)); // Sync cart with backend
            dispatch(resetOrderList()); // Reset order list
            sessionStorage.removeItem("currentOrderId");
            navigate("/success"); // Redirect to success page
          }
        });
      }
    }
  }, [paymentId, payerId, dispatch, navigate, user?._id]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold">Processing your payment...</h1>
    </div>
  );
};

export default PaymentSuccessPage;