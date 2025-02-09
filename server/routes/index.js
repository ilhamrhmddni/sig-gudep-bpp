const express = require("express");
const route = express.Router();

const userRoute = require("./user-route");
const geographicalRoute = require("./geographical-route");
const kwarranRoute = require("./kwarran-route");
const pesertadidikRoute = require("./pesertadidik-route");
const laporanRoute = require("./laporan-route");
const gudepRoute = require("./gudep-route");

route.get("/", (req, res) => {
  res.json({
    messsage:
      "Sistem Informasi Geografis Pemetaan Gugus Depan Gerakan Pramuka Kota Balikpapan",
  });
});

route.use("/users", userRoute);
route.use("/geographicals", geographicalRoute);
route.use("/kwarrans", kwarranRoute);
route.use("/pesertadidik", pesertadidikRoute);
route.use("/laporan", laporanRoute);
route.use("/gudep", gudepRoute);

module.exports = route;
