import { initializeSSLCommerzPayment } from "../../helpers/sslcommerz.js";
import { Order } from "../../models/Order.js";
import { Product } from "../../models/Product.js";
import {Cart}  from "../../models/Cart.js"

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Prepare SSLCommerz payment data
    const paymentData = {
      total_amount: totalAmount,
      currency: "BDT",
      tran_id: `TXN_${Date.now()}`,
      success_url: "http://localhost:3000/api/shop/order/sslcommerz-success", // Backend success route
      fail_url: "http://localhost:3000/api/shop/order/sslcommerz-fail", // Backend fail route
      cancel_url: "http://localhost:3000/api/shop/order/sslcommerz-cancel", // Backend cancel route
      ipn_url: "http://localhost:3000/api/shop/order/sslcommerz-ipn", // Backend IPN route
      shipping_method: "Courier", // Shipping method
      product_name: "Online Purchase", // Product name
      product_category: "General", // Product category
      product_profile: "general", // Product profile
      cus_name: addressInfo?.name || "Customer Name", // Customer name
      cus_email: addressInfo?.email || "customer@example.com", // Customer email
      cus_add1: addressInfo?.address || "Dhaka", // Customer address line 1
      cus_city: addressInfo?.city || "Dhaka", // Customer city
      cus_postcode: addressInfo?.postcode || "1000", // Customer postcode
      cus_phone: addressInfo?.phone || "01711111111", // Customer phone
      ship_name: addressInfo?.name || "Customer Name", // Shipping name
      ship_add1: addressInfo?.address || "Dhaka", // Shipping address line 1
      ship_city: addressInfo?.city || "Dhaka", // Shipping city
      ship_postcode: addressInfo?.postcode || "1000", // Shipping postcode
      ship_country: "Bangladesh", // Shipping country
    };

    // Initialize SSLCommerz payment
    const GatewayPageURL = await initializeSSLCommerzPayment(paymentData);

    // Save the order to the database
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newlyCreatedOrder.save();

    // Return the payment gateway URL and order ID
    res.status(201).json({
      success: true,
      GatewayPageURL,
      orderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.title}` });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed and cart cleared",
      data: order,
    });
  } catch (e) {
    console.error("Error in capturePayment:", e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};