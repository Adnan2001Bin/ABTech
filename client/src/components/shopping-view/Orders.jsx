import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Truck, CheckCircle, Clock } from "lucide-react";
import ShoppingOrderDetailsView from "./Order-Details";
import { Dialog } from "../ui/dialog";

const ShoppingOrders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample data
  const orders = [
    {
      id: "ORD001",
      date: "2023-10-01",
      status: "Shipped",
      total: "$120.00",
      items: [
        { name: "Product A", quantity: 2, price: "$50.00" },
        { name: "Product B", quantity: 1, price: "$20.00" },
      ],
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD002",
      date: "2023-10-02",
      status: "Delivered",
      total: "$80.00",
      items: [{ name: "Product C", quantity: 1, price: "$80.00" }],
      shippingAddress: "456 Elm St, Los Angeles, CA 90001",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD003",
      date: "2023-10-03",
      status: "Pending",
      total: "$200.00",
      items: [
        { name: "Product D", quantity: 3, price: "$50.00" },
        { name: "Product E", quantity: 1, price: "$50.00" },
      ],
      shippingAddress: "789 Oak St, Chicago, IL 60601",
      paymentMethod: "Cash on Delivery",
    },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order
    setIsDialogOpen(true); // Open the dialog
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <Badge
                  variant={
                    order.status === "Shipped"
                      ? "secondary"
                      : order.status === "Delivered"
                      ? "success"
                      : "destructive"
                  }
                  className="flex items-center gap-1"
                >
                  {order.status === "Shipped" && <Truck className="w-4 h-4" />}
                  {order.status === "Delivered" && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {order.status === "Pending" && <Clock className="w-4 h-4" />}
                  {order.status}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold">Items:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold">{order.total}</p>
                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(order)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Dialog for Order Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ShoppingOrderDetailsView orderDetails={selectedOrder} />
      </Dialog>
    </div>
  );
};

export default ShoppingOrders;