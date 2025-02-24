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
            dispatch(clearCart());
            dispatch(fetchCartItems(user?._id));
            dispatch(resetOrderList());
            sessionStorage.removeItem("currentOrderId");
            navigate("/success");
          }
        });
      }
    }
  }, [paymentId, payerId, dispatch, navigate, user?._id]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <svg
          className="animate-spin h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
          Processing your payment...
        </h1>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;