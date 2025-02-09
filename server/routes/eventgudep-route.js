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
route.get("/:eventId/:gudepId", getEventGudepById);
route.post("/", addEventGudep);
route.put("/:eventId/:gudepId", updateEventGudep);
route.delete("/:eventId/:gudepId", deleteEventGudep);

module.exports = route;
