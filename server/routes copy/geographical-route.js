const express = require("express");
const route = express.Router();

const {
  getAllGeographical,
  getGeographical,
  addGeographical,
  deleteGeographical,
  updateGeographical,
} = require("../controllers/geografis-controller.js");

route.get("/", getAllGeographical);
route.get("/:id", getGeographical);
route.post("/", addGeographical);
route.put("/:id", updateGeographical);
route.delete("/:id", deleteGeographical);

module.exports = route;
