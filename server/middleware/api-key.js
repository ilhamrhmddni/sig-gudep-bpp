require("dotenv").config();
const validApiKeys = process.env.API_KEY;

const apiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key diperlukan!" });
  }

  if (validApiKeys.includes(apiKey)) {
    next();
  } else {
    res.status(403).json({ error: "API key tidak valid!" });
  }
};

module.exports = apiKey;
