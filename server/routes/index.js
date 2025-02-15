const express = require("express");
const route = express.Router();

const userRoute = require("./user-route");
const geografisRoute = require("./geografis-route");
const kwarranRoute = require("./kwarran-route");
const pesertadidikRoute = require("./pesertadidik-route");
const laporanRoute = require("./laporan-route");
const gudepRoute = require("./gudep-route");
const eventRoute = require("./event-route");
const eventGudepRoute = require("./eventgudep-route");
const authRoute = require("./auth-route");

route.get("/", (req, res) => {
  res.json({
    messsage:
      "Sistem Informasi Geografis Pemetaan Gugus Depan Gerakan Pramuka Kota Balikpapan",
  });
});

route.use("/user", userRoute);
route.use("/geografis", geografisRoute);
route.use("/kwarran", kwarranRoute);
route.use("/pesertadidik", pesertadidikRoute);
route.use("/laporan", laporanRoute);
route.use("/gudep", gudepRoute);
route.use("/event", eventRoute);
route.use("/eventgudep", eventGudepRoute);
route.use("/auth", authRoute);

module.exports = route;
