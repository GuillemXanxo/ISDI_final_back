const { Joi } = require("express-validation");

const registerValidation = {
  body: Joi.object({
    nom: Joi.string().required(),
    usuari: Joi.string().required(),
    contrassenya: Joi.string().required(),
    telefon: Joi.string().required(),
  }),
};

const loginValidation = {
  body: Joi.object({
    usuari: Joi.string().required(),
    contrassenya: Joi.string().required(),
  }),
};

module.exports = { registerValidation, loginValidation };
