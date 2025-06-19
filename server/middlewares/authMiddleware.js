const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  // console.log("🧪 Token received:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    // console.log("❌ JWT verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

module.exports = authMiddleware;
