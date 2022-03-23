const { Joi } = require("express-validation");

const createTripValidation = {
  body: Joi.object({
    origen: Joi.string().required(),
    desti: Joi.string().required(),
    places: Joi.string().required(),
    data: Joi.string().required(),
    horaSortida: Joi.string().required(),
    comentaris: Joi.string().required(),
    dones: Joi.boolean(),
  }),
};

module.exports = { createTripValidation };
