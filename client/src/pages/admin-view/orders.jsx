import React, { useEffect, useState } from "react";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin } from "@/store/admin/order-slice";
import { Dialog } from "@/components/ui/dialog";
import AdminOrderDetailsView from "./OrderDetailsView";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminOrders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setIsDialogOpen(true);
  }, [orderDetails]);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="shadow-lg border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">Orders</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full sm:w-48 px-3 py-1 rounded-md border border-gray-200 text-gray-700"
            />
            <Button variant="outline" className="flex gap-2 text-white border-white hover:bg-green-700">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Mobile View (Card Layout) */}
          <div className="block sm:hidden space-y-4">
            {orderList.map((order) => (
              <Card key={order._id} className="p-4 border border-gray-100">
                <div className="space-y-2">
                  <p className="text-sm font-medium">#{order._id.slice(-6)}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <Badge
                    className={`text-xs ${
                      order.orderStatus === "delivered" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </Badge>
                  <p className="text-sm">{order.cartItems.length} items</p>
                  <p className="text-sm font-bold text-green-600">
                    TK{order.totalAmount.toFixed(2)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFetchOrderDetails(order._id)}
                  >
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {/* Tablet/Desktop View (Table Layout) */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm sm:text-base">Order ID</TableHead>
                  <TableHead className="text-sm sm:text-base">Date</TableHead>
                  <TableHead className="text-sm sm:text-base">Status</TableHead>
                  <TableHead className="text-sm sm:text-base">Items</TableHead>
                  <TableHead className="text-sm sm:text-base">Total</TableHead>
                  <TableHead className="text-sm sm:text-base">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="text-sm">#{order._id.slice(-6)}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs sm:text-sm ${
                          order.orderStatus === "delivered" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{order.cartItems.length} items</TableCell>
                    <TableCell className="text-sm font-bold text-green-600">
                      TK{order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFetchOrderDetails(order._id)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AdminOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </div>
  );
};

export default AdminOrders;