import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user! Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "default_secret");
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user! Invalid or expired token.",
    });
  }
};

export default authMiddleware;
