const express = require("express");
const route = express.Router();

const {
  getAllUser,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/user-controller.js");

// Route untuk mengambil semua user
route.get("/", getAllUser);

// Route untuk menambah user oleh admin
route.post("/", addUser);

// Route untuk menghapus user oleh admin
route.delete("/:id", deleteUser);

// Route untuk mengupdate user oleh admin
route.put("/:id", updateUser);

module.exports = route;
