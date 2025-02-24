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
route.get("/:eventgudepId", getEventGudepById);
route.post("/", addEventGudep);
route.put("/:eventgudepId", updateEventGudep);
route.delete("/:eventgudepId", deleteEventGudep);

module.exports = route;
