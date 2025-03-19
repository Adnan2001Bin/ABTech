import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/auth.route.js";
import userRouter from "./routes/auth/user.route.js";
import adminProductsRouter from "./routes/admin/products-routes.js";
import adminOrderRouter  from "./routes/admin/order-routes.js"
import shopProductsRouter from "./routes/shop/products.routes.js";
import shopCartRouter from "./routes/shop/cart.routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";

const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN.split(","), // Split into an array
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//     optionsSuccessStatus: 204, // Required for legacy browsers
//   })
// );

app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(",") || [
      "http://localhost:6500",
      "https://ab-tech-three.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
      "X-Requested-With"
    ],
    credentials: true,
    optionsSuccessStatus: 204
  })
);

app.use(express.json()); // Parse JSON data
app.use(cookieParser());

// Handle preflight requests
app.options("*", cors());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);

export default app;