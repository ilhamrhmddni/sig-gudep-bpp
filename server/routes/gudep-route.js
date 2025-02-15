const express = require("express");
const route = express.Router();

const {
  getAllGudep,
  getGudep,
  addGudep,
  updateGudep,
  deleteGudep,
} = require("../controllers/gudep-controller.js");

route.get("/", getAllGudep);
route.get("/:id", getGudep);
route.put("/:id", updateGudep);

module.exports = route;
