const express = require("express");
const route = express.Router();

const {
  getAllGudep,
  getGudep,
  updateGudep,
  addGudep,
} = require("../controllers/gudep-controller.js");

route.get("/", getAllGudep);
route.get("/:id", getGudep);
route.post("/:id", addGudep);
route.put("/:id", updateGudep);

module.exports = route;
