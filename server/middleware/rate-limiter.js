const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { error: "Terlalu banyak percobaan login, coba lagi nanti!" },
});

module.exports = loginLimiter;
