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
route.post("/", addGeografis);
route.put("/:id", updateGeografis);
route.delete("/:id", deleteGeografis);

module.exports = route;
