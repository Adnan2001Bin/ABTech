import express from "express";
import {registerUser , loginUser, logoutUser, sendVerifyOtp, verifyEmail, isAuthenticated, resetPassword, sendResetOtp } from "../../controllers/auth/controller.js";
import authMiddleware from "../../controllers/authMiddleware.js";

const authAouter = express.Router();

// Public routes
authAouter.post("/register", registerUser);
authAouter.post("/login", loginUser);
authAouter.post("/logout", logoutUser);
authAouter.post("/send-verify-otp", authMiddleware , sendVerifyOtp);
authAouter.post("/verify-account", authMiddleware , verifyEmail);
authAouter.get("/is-auth", authMiddleware , isAuthenticated);
authAouter.post("/send-reset-otp", sendResetOtp);
authAouter.post("/reset-password", resetPassword);

export default authAouter;
