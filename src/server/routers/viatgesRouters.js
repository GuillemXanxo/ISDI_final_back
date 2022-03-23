require("dotenv").config();
const { validate } = require("express-validation");
const express = require("express");
const {
  getViatgesCrono,
  deleteViatge,
  createViatge,
  getThisViatge,
  getUserViatges,
} = require("../controllers/viatgesControllers");
const auth = require("../middlewares/auth");
const { createTripValidation } = require("../schemas/tripSchemas");

const router = express.Router();

router.get("/crono", getViatgesCrono);
router.get("/publicats", auth, getUserViatges);
router.get("/:id", getThisViatge);
router.delete("/:id", auth, deleteViatge);
router.post("/crear", auth, validate(createTripValidation), createViatge);

module.exports = router;
