const express = require("express");
const route = express.Router();

const userRoute = require("./user-route");

route.get("/", (req, res) => {
  res.json({
    messsage:
      "Sistem Informasi Geografis Pemetaan Gugus Depan Gerakan Pramuka Kota Balikpapan",
  });
});

route.use("/users", userRoute);

module.exports = route;
