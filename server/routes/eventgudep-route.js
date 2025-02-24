const express = require("express");
const route = express.Router();

const {
  getAllEventGudeps,
  getEventGudepById,
  addEventGudep,
  updateEventGudep,
  deleteEventGudep,
} = require("../controllers/eventgudep-controller.js");

route.get("/", getAllEventGudeps);
route.get("/:id", getEventGudepById);
route.post("/", addEventGudep);
route.put("/:id", updateEventGudep);
route.delete("/:id", deleteEventGudep);

module.exports = route;
