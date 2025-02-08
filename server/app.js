const express = require("express");
const cors = require("cors");
const app = express();
const rootRoutes = require("./routes");
const db = require("./models/index");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(rootRoutes);

const port = process.env.PORT || 3000;

// Cek koneksi database
db.sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Database connection error:", err));

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
