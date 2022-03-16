const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const encrypt = require("../../utils/encrypt");
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

const userRegister = async (req, res, next) => {
  const { nom, usuari, contrassenya, telefon } = req.body;
  const user = await Usuari.findOne({ usuari });
  if (!usuari || !contrassenya || !telefon || !nom || user) {
    const errorWPW = new Error(`Alguna cosa ha anat malament en el registre`);
    errorWPW.status = 400;
    return next(errorWPW);
  }
  try {
    const encryptedPasword = await encrypt(contrassenya);
    await Usuari.create({
      nom,
      usuari,
      contrassenya: encryptedPasword,
      telefon,
      viatges: [],
    });
    return res
      .status(201)
      .json({ message: `Usuari ${usuari} s'ha registrat correctament` });
  } catch (error) {
    return next(error);
  }
};

module.exports = { userLogin, userRegister };
