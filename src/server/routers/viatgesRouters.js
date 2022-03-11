require("dotenv").config();
const express = require("express");
const {
  getViatgesCrono,
  deleteViatge,
} = require("../controllers/viatgesControllers");

const router = express.Router();

router.get("/crono", getViatgesCrono);
router.delete("/:id", deleteViatge);

module.exports = router;
