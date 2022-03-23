require("dotenv").config();
const express = require("express");
const {
  getViatgesCrono,
  deleteViatge,
  createViatge,
  getThisViatge,
  getUserViatges,
} = require("../controllers/viatgesControllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/crono", getViatgesCrono);
router.get("/publicats", auth, getUserViatges);
router.get("/:id", getThisViatge);
router.delete("/:id", auth, deleteViatge);
router.post("/crear", auth, createViatge);

module.exports = router;
