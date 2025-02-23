import React from 'react';

import { Search, Filter, MoreVertical, Badge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminOrders = () => {
  // Sample data
  const orders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      date: '2023-10-01',
      status: 'Shipped',
      total: '$120.00',
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      date: '2023-10-02',
      status: 'Pending',
      total: '$80.00',
    },
    {
      id: 'ORD003',
      customer: 'Alice Johnson',
      date: '2023-10-03',
      status: 'Delivered',
      total: '$200.00',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            Orders Management
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'Shipped'
                          ? 'secondary'
                          : order.status === 'Delivered'
                          ? 'success'
                          : 'destructive'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;