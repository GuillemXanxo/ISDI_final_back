import { Joi } from "express-validation";

export const registerValidation = {
  body: Joi.object({
    nom: Joi.string().required(),
    usuari: Joi.string().required(),
    contrassenya: Joi.string()
      .regex(/^[a-zA-Z0-9]{7,20}$/)
      .required(),
    telefon: Joi.string().required(),
  }),
};

export const loginValidation = {
  body: Joi.object({
    usuari: Joi.string().required(),
    contrassenya: Joi.string()
      .regex(/^[a-zA-Z0-9]{7,20}$/)
      .required(),
  }),
};
