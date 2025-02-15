const express = require("express");
const route = express.Router();

const {
  getAllGeografis,
  getGeografis,
  addGeografis,
  deleteGeografis,
  updateGeografis,
} = require("../controllers/geografis-controller.js");

route.get("/", getAllGeografis);
route.get("/:id", getGeografis);
route.put("/:id", updateGeografis);

module.exports = route;
