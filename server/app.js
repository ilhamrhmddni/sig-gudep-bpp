const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const sequelize = require("./models/index");

const port = process.env.PORT || 5432;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
