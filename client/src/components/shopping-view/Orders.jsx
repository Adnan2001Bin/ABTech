import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Truck, CheckCircle, Clock, ShoppingBag } from "lucide-react";
import ShoppingOrderDetailsView from "./Order-Details";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";

const ShoppingOrders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (user?._id) dispatch(getAllOrdersByUserId(user._id));
  }, [dispatch, user?._id]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 sm:p-6 rounded-t-2xl flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            My Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 bg-gray-50">
          {orderList.length > 0 ? (
            <div className="grid gap-4 sm:gap-6">
              {orderList.map((order) => (
                <Card
                  key={order._id}
                  className="p-3 sm:p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-gray-700 uppercase">
                        Order #{order._id.slice(-6)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700">
                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <Badge
                        className={`mt-2 text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                          order.orderStatus === "confirmed"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.orderStatus === "confirmed" && <Truck className="w-4 h-4 mr-1" />}
                        {order.orderStatus === "delivered" && (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        {order.orderStatus === "pending" && <Clock className="w-4 h-4 mr-1" />}
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-gray-700 uppercase">
                        Items
                      </p>
                      <ul className="text-xs sm:text-sm text-gray-700 space-y-1 max-h-20 overflow-y-auto">
                        {order.cartItems.map((item, index) => (
                          <li key={index} className="truncate">
                            {item.title} <span className="text-gray-500">(x{item.quantity})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-base sm:text-lg font-bold text-green-600">
                        TK{order.totalAmount.toFixed(2)}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-2 text-xs sm:text-sm px-3 sm:px-4 py-1 hover:bg-gray-100"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12">
              <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm sm:text-lg text-gray-700">
                No orders found. Start shopping now!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ShoppingOrderDetailsView orderDetails={selectedOrder} />
      </Dialog>
    </div>
  );
};

export default ShoppingOrders;