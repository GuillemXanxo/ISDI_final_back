const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuari = require("../../db/models/Usuari");

const userLogin = async (req, res, next) => {
  const { usuari, contrassenya } = req.body;
  const user = await Usuari.findOne({ usuari });
  if (!user) {
    const error = new Error("Alguna de les teves dades no és vàlida");
    error.status = 401;
    return next(error);
  }
  const isRightPassword = await bcrypt.compare(contrassenya, user.contrassenya);
  if (!isRightPassword) {
    const errorWrongPwd = new Error("Alguna de les teves dades no és vàlida");
    errorWrongPwd.status = 401;
    return next(errorWrongPwd);
  }
  const userData = {
    nom: usuari.nom,
    id: usuari.id,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token });
};

const userRegister = () => {};

module.exports = { userLogin, userRegister };
