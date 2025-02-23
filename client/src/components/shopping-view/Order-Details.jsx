import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Badge } from "../ui/badge";
import { Truck, CheckCircle, Clock } from "lucide-react";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <DialogDescription>
          Detailed information about your order.
        </DialogDescription>
      </DialogHeader>
      {orderDetails && (
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm font-semibold">Order ID:</p>
            <p className="text-sm text-gray-600">{orderDetails.id}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Date:</p>
            <p className="text-sm text-gray-600">{orderDetails.date}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Status:</p>
            <Badge
              variant={
                orderDetails.status === "Shipped"
                  ? "secondary"
                  : orderDetails.status === "Delivered"
                  ? "success"
                  : "destructive"
              }
              className="flex items-center gap-1"
            >
              {orderDetails.status === "Shipped" && (
                <Truck className="w-4 h-4" />
              )}
              {orderDetails.status === "Delivered" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {orderDetails.status === "Pending" && (
                <Clock className="w-4 h-4" />
              )}
              {orderDetails.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-semibold">Items:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.name} (x{item.quantity}) - {item.price}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Shipping Address:</p>
            <p className="text-sm text-gray-600">
              {orderDetails.shippingAddress}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Payment Method:</p>
            <p className="text-sm text-gray-600">
              {orderDetails.paymentMethod}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Total:</p>
            <p className="text-sm text-gray-600">{orderDetails.total}</p>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;