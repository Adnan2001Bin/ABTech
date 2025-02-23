import React, { useState, useEffect } from "react";
import { ShoppingCart, CreditCard, Truck, Gift } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Address from "@/components/shopping-view/Address";
import { useSelector, useDispatch } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { toast } from "react-toastify";
import { createNewOrder } from "@/store/shop/order-slice";

// GiftOptions Component
const GiftOptions = ({ giftWrap, setGiftWrap, giftMessage, setGiftMessage, GIFT_WRAP_COST }) => (
  <Card className="shadow-md rounded-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold flex items-center gap-2">
        <Gift className="w-5 h-5" />
        Gift Options
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-3">
        <Checkbox id="gift-wrap" checked={giftWrap} onCheckedChange={setGiftWrap} />
        <Label htmlFor="gift-wrap">Add Gift Wrap (TK{GIFT_WRAP_COST}.00)</Label>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox id="gift-message" checked={giftMessage} onCheckedChange={setGiftMessage} />
        <Label htmlFor="gift-message">Include a Gift Message</Label>
      </div>
    </CardContent>
  </Card>
);

// CartItems Component
const CartItems = ({ cartItems }) => (
  <Card className="shadow-md rounded-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Cart Items
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {cartItems?.items?.length > 0 ? (
        cartItems.items.map((item) => <UserCartItemsContent key={item.id} cartItem={item} />)
      ) : (
        <p className="text-gray-500">Your cart is empty</p>
      )}
    </CardContent>
  </Card>
);

// OrderSummary Component
const OrderSummary = ({ subtotal, SHIPPING_COST, giftWrap, GIFT_WRAP_COST, totalAmount }) => (
  <Card className="shadow-md rounded-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Order Summary
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold">TK{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Shipping</span>
        <span className="font-semibold">TK{SHIPPING_COST.toFixed(2)}</span>
      </div>
      {giftWrap && (
        <div className="flex justify-between">
          <span className="text-gray-600">Gift Wrap</span>
          <span className="font-semibold">TK{GIFT_WRAP_COST.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between border-t pt-4">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-bold">TK{totalAmount.toFixed(2)}</span>
      </div>
    </CardContent>
  </Card>
);

// PaymentMethod Component
const PaymentMethod = () => (
  <Card className="shadow-md rounded-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Method
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <RadioGroup defaultValue="bkash" className="space-y-3">
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="bkash" id="bkash" />
          <Label htmlFor="bkash">bKash</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
          <Label htmlFor="cash-on-delivery">Cash on Delivery</Label>
        </div>
      </RadioGroup>
    </CardContent>
  </Card>
);

// Main ShoppingCheckout Component
const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { GatewayPageURL } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState(false);

  const SHIPPING_COST = 100; // TK100 as per original code
  const GIFT_WRAP_COST = 5;

  const subtotal = cartItems?.items?.length > 0
    ? cartItems.items.reduce(
        (sum, item) => sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
        0
      )
    : 0;

  const giftWrapCost = giftWrap ? GIFT_WRAP_COST : 0;
  const totalAmount = subtotal + SHIPPING_COST + giftWrapCost;

  const handleSuccessToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleInitiatePaypalPayment = async () => {

    if (cartItems.length === 0) {
      handleSuccessToast("Your cart is empty. Please add items to proceed");
      return;
    }
    if (currentSelectedAddress === null) {
      handleSuccessToast("Please select one address to proceed.");
      return;
    }

    const orderData = {
      userId: user?._id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "bkash",
      paymentStatus: "pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    try {
       dispatch(createNewOrder(orderData));
    } catch (error) {
      console.error("Error creating order:", error);
      handleSuccessToast("Failed to create order. Please try again.");
    }
  };

  useEffect(() => {
    if (GatewayPageURL) {
      window.location.href = GatewayPageURL; // Redirect to payment gateway
    }
  }, [GatewayPageURL]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
          <GiftOptions
            giftWrap={giftWrap}
            setGiftWrap={setGiftWrap}
            giftMessage={giftMessage}
            setGiftMessage={setGiftMessage}
            GIFT_WRAP_COST={GIFT_WRAP_COST}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CartItems cartItems={cartItems} />
          <OrderSummary
            subtotal={subtotal}
            SHIPPING_COST={SHIPPING_COST}
            giftWrap={giftWrap}
            GIFT_WRAP_COST={GIFT_WRAP_COST}
            totalAmount={totalAmount}
          />
          <PaymentMethod />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            onClick={handleInitiatePaypalPayment}
          >
            Place Order (TK{totalAmount.toFixed(2)})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;