const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { verifyToken } = require("../middleware/auth-middleware");
const loginLimiter = require("../middleware/rate-limiter");

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", verifyToken, authController.logout);

module.exports = router;
