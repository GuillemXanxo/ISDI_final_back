require("dotenv").config();
const express = require("express");
const {
  getViatgesCrono,
  deleteViatge,
  createViatge,
  getThisViatge,
} = require("../controllers/viatgesControllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/crono", getViatgesCrono);
router.delete("/:id", auth, deleteViatge);
router.get("/:id", getThisViatge);
router.post("/crear", auth, createViatge);

module.exports = router;
