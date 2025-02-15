const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "secretKey";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses khusus admin" });
  }
  next();
};

const isOperator = (req, res, next) => {
  if (req.user.role !== "operator") {
    return res.status(403).json({ message: "Akses khusus operator" });
  }
  next();
};

module.exports = { verifyToken, isAdmin, isOperator };
