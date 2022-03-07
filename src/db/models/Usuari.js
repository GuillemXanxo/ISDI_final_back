const { Schema, model } = require("mongoose");

const UsuariSchema = new Schema({
  nom: {
    type: String,
    required: true,
    min: 1,
    max: 200,
  },
  usuari: {
    type: String,
    required: true,
  },
  contrassenya: {
    type: String,
    required: true,
  },
  viatges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Viatge",
    },
  ],
});

const Usuari = model("Usuari", UsuariSchema, "usuaris");

module.exports = Usuari;
