const express = require("express");
const cors = require("cors");
const app = express();
const rootRoutes = require("./routes");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(rootRoutes);

const sequelize = require("./models/index");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
