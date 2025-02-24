import React from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Truck, CheckCircle, Clock, MapPin, CreditCard, Package } from "lucide-react";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  return (
    <DialogContent className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-xl shadow-lg bg-white border border-gray-100">
      <DialogHeader className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 sm:p-5 rounded-t-xl">
        <DialogTitle className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 sm:w-6 sm:h-6" />
          Order Summary
        </DialogTitle>
        <DialogDescription className="text-gray-100 text-xs sm:text-sm">
          Everything you need to know about your order.
        </DialogDescription>
      </DialogHeader>
      {orderDetails && (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs font-medium text-gray-700 uppercase">Order ID</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1 break-all">
                  {orderDetails._id}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 uppercase">Date</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
                  {new Date(orderDetails.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-xs font-medium text-gray-700 uppercase">Status</p>
              <Badge
                className={`mt-1 text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                  orderDetails.orderStatus === "confirmed"
                    ? "bg-yellow-100 text-yellow-700"
                    : orderDetails.orderStatus === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {orderDetails.orderStatus === "confirmed" && <Truck className="w-4 h-4 mr-1" />}
                {orderDetails.orderStatus === "delivered" && (
                  <CheckCircle className="w-4 h-4 mr-1" />
                )}
                {orderDetails.orderStatus === "pending" && <Clock className="w-4 h-4 mr-1" />}
                {orderDetails.orderStatus.charAt(0).toUpperCase() + orderDetails.orderStatus.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-700 uppercase mb-2">Items Ordered</p>
            <ul className="space-y-2 sm:space-y-3">
              {orderDetails.cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-xs sm:text-sm">
                  <span>
                    {item.title} <span className="text-gray-500">(x{item.quantity})</span>
                  </span>
                  <span className="font-semibold">TK{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-700 uppercase flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Shipping Address
              </p>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">
                {orderDetails.addressInfo.address}, {orderDetails.addressInfo.city},{" "}
                {orderDetails.addressInfo.pincode}
              </p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-700 uppercase flex items-center gap-1">
                <CreditCard className="w-4 h-4" /> Payment Method
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-2 capitalize">
                {orderDetails.paymentMethod}
              </p>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
            <p className="text-xs font-medium text-gray-700 uppercase">Total Amount</p>
            <p className="text-base sm:text-lg font-bold text-green-600">
              TK{orderDetails.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;