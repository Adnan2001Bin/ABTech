import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/auth.route.js";
import userRouter from "./routes/auth/user.route.js";
import adminProductsRouter from "./routes/admin/products-routes.js";
import shopProductsRouter from "./routes/shop/products.routes.js";
import shopCartRouter from "./routes/shop/cart.routes.js"

const app = express();


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", " POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);


export default app;
