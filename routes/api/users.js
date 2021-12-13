const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUsers
} = require("../../controller/users");

router.get("/", getUsers);

router.post("/register", registerUsers);

module.exports = router;
