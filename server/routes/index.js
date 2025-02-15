const express = require("express");
const route = express.Router();
const apiKey = require("../middleware/api-key");

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

route.use("/user", apiKey, userRoute);
route.use("/geografis", apiKey, geografisRoute);
route.use("/kwarran", apiKey, kwarranRoute);
route.use("/pesertadidik", apiKey, pesertadidikRoute);
route.use("/laporan", apiKey, laporanRoute);
route.use("/gudep", apiKey, gudepRoute);
route.use("/event", apiKey, eventRoute);
route.use("/eventgudep", apiKey, eventGudepRoute);
route.use("/auth", authRoute);

module.exports = route;
