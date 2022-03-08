require("dotenv").config();
const express = require("express");
const { getViatges } = require("../controllers/viatgesControllers");

const router = express.Router();

router.get("/crono", getViatges);

module.exports = router;
