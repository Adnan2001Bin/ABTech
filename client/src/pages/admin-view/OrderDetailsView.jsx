import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice";
import { toast } from "react-toastify";
import CommonForm from "@/components/common/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Clock, CreditCard, MapPin, Package } from "lucide-react";

const initialFormData = { status: "" };

const AdminOrderDetailsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleSuccessToast = (message) => {
    toast.success(message, { position: "top-center", autoClose: 2000 });
  };

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    const { status } = formData;
    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        handleSuccessToast(data?.payload?.message);
      }
    });
  };

  return (
    <DialogContent className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white border border-gray-200 shadow-lg p-0">
      <DialogHeader className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 sm:p-5 rounded-t-lg">
        <DialogTitle className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 sm:w-6 sm:h-6" /> Order #{orderDetails?._id.slice(-6)}
        </DialogTitle>
        <DialogDescription className="text-gray-100 text-xs sm:text-sm">
          Manage order details and status below.
        </DialogDescription>
      </DialogHeader>
      {orderDetails && (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-sm font-medium text-gray-700">Order Status</p>
              <Badge
                className={`py-1 px-2 sm:px-3 text-xs sm:text-sm font-semibold text-white ${
                  orderDetails.orderStatus === "delivered"
                    ? "bg-green-500"
                    : orderDetails.orderStatus === "rejected"
                    ? "bg-red-600"
                    : orderDetails.orderStatus === "pending"
                    ? "bg-gray-500"
                    : orderDetails.orderStatus === "inProcess"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              >
                {orderDetails.orderStatus.charAt(0).toUpperCase() + orderDetails.orderStatus.slice(1)}
              </Badge>
            </div>
            <CommonForm
              formClassName="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3"
              formControls={[
                {
                  label: "Update Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update"}
              onSubmit={handleUpdateStatus}
              selectClassName="w-full sm:w-40"
              buttonClassName="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
              labelClassName="hidden"
            />
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">Items Ordered</p>
            <ul className="space-y-2 sm:space-y-3">
              {orderDetails.cartItems.map((item) => (
                <li key={item._id} className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    {item.title} <span className="text-gray-500">(x{item.quantity})</span>
                  </span>
                  <span className="font-semibold text-green-600">TK{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" /> Shipping Address
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {orderDetails.addressInfo.address}, {orderDetails.addressInfo.city},{" "}
                {orderDetails.addressInfo.pincode}
              </p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-gray-400" /> Payment Method
              </p>
              <p className="text-xs sm:text-sm text-gray-600 capitalize">{orderDetails.paymentMethod}</p>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">Total Amount</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              TK{orderDetails.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default AdminOrderDetailsView;