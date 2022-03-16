require("dotenv").config();
const express = require("express");
const userLogin = require("../controllers/usuariControllers");

const router = express.Router();

router.post("/login", userLogin);

module.exports = router;
