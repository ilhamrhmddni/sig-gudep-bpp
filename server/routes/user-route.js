const express = require("express");
const route = express.Router();

const { getAllUser } = require("../controllers/user-controller.js");

route.get("/", getAllUser);

module.exports = route;
