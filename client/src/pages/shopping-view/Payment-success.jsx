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
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    if (tranId && valId && orderId) {
      dispatch(capturePayment({ paymentId: tranId, payerId: valId, orderId })).then((data) => {
        if (data?.payload?.success) {
          dispatch(clearCart());
          dispatch(fetchCartItems(user?._id));
          dispatch(resetOrderList());
          sessionStorage.removeItem("currentOrderId");
        }
      });
    }

    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate, tranId, valId, user?._id]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <svg
          className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-green-600 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600">
          Transaction ID: {tranId}
        </p>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600">Validation ID: {valId}</p>
        <p className="text-xs sm:text-sm text-gray-500">
          Redirecting to homepage in 3 seconds...
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;