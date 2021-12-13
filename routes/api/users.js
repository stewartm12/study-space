const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUsers,
  loginUser,
} = require("../../controller/users");

router.get("/", getUsers);

router.post("/register", registerUsers);

router.post("/login", loginUser);

module.exports = router;
