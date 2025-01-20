import express from "express";
import {registerUser , loginUser, logoutUser } from "../../controllers/auth/controller.js";
import authMiddleware from "../../controllers/authMiddleware.js";

const authAouter = express.Router();

// Public routes
authAouter.post("/register", registerUser);
authAouter.post("/login", loginUser);
authAouter.post("/logout", logoutUser);

// protected route
authAouter.get("/check-auth", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted to protected route.",
    user: req.user, // Decoded user information from JWT
  });
})

export default authAouter;
