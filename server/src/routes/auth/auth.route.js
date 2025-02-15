import express from "express";
import {registerUser , loginUser, logoutUser, sendVerifyOtp, verifyEmail, isAuthenticated, resetPassword, sendResetOtp } from "../../controllers/auth/controller.js";
import authMiddleware from "../../controllers/authMiddleware.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/send-verify-otp", authMiddleware , sendVerifyOtp);
authRouter.post("/verify-account", authMiddleware , verifyEmail);
authRouter.get("/is-auth", authMiddleware , isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
