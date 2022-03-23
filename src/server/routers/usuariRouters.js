require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const { userLogin, userRegister } = require("../controllers/usuariControllers");
const {
  registerValidation,
  loginValidation,
} = require("../schemas/userSchemas");

const router = express.Router();

router.post("/login", validate(loginValidation), userLogin);
router.post("/register", validate(registerValidation), userRegister);

module.exports = router;
