import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check token presence
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Support both { id } and { userId } payloads
    const userId = decoded?.id || decoded?.userId;

    if (!decoded || !userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // ✅ Fetch user and attach to req
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

export default protect;
