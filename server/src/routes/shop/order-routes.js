import express from "express";
import { capturePayment, createOrder, getAllOrdersByUser, getOrderDetails } from "../../controllers/shop/order-controller.js";

const router = express.Router();

// Route to create a new order
router.post("/create", createOrder);

// SSLCommerz callback routes
router.post("/sslcommerz-success", (req, res) => {
  console.log("Request Body:", req.body);
  const { tran_id, val_id, paymentId, payerId } = req.body;
  res.redirect(
    `${process.env.CORS_ORIGIN}/success?tran_id=${tran_id}&val_id=${val_id}&paymentId=${paymentId}&payerId=${payerId}`
  );
});

router.post("/sslcommerz-fail", (req, res) => {
  const { tran_id } = req.body;
  console.log("Payment failed. Transaction ID:", tran_id);
  res.redirect(`${process.env.CORS_ORIGIN}/sslcommerz-fail`);
});

router.post("/sslcommerz-cancel", (req, res) => {
  const { tran_id } = req.body;
  console.log("Payment canceled. Transaction ID:", tran_id);
  res.redirect(`${process.env.CORS_ORIGIN}/sslcommerz-cancel`);
});

router.post("/sslcommerz-ipn", (req, res) => {
  const paymentData = req.body;
  console.log("IPN received:", paymentData);
  res.status(200).send("IPN received");
});

router.post("/capture", capturePayment);

router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export default router;