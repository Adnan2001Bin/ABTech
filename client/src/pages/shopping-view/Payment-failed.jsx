import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Paymentfailed = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
      <Card className="shadow-lg rounded-lg border border-red-200 max-w-md w-full">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Payment Failed
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 space-y-6 text-center">
          <div>
            <p className="text-lg text-gray-700 mb-2">
              Oops! Something went wrong with your payment.
            </p>
            <p className="text-sm text-gray-500">
              Don’t worry—your order has not been processed. Please try again or
              contact support if the issue persists.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/checkout")}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
            >
              Retry Payment
            </Button>
            <Button
              onClick={() => navigate("/collections")}
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50 py-3 rounded-lg"
            >
              Back to Shopping
            </Button>
          </div>

          {/* Contact Support */}
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@yourshop.com"
              className="text-red-600 hover:underline"
            >
              Contact Support
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Paymentfailed;