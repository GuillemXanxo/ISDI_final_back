require("dotenv").config();
const express = require("express");
const {
  getViatgesCrono,
  deleteViatge,
  createViatge,
} = require("../controllers/viatgesControllers");

const router = express.Router();

router.get("/crono", getViatgesCrono);
router.delete("/:id", deleteViatge);
router.post("/crear", createViatge);

module.exports = router;
