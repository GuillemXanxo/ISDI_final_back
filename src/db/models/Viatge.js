const { Schema, model } = require("mongoose");

const ViatgeSchema = new Schema({
  origen: {
    type: String,
    required: true,
  },
  desti: {
    type: String,
    required: true,
  },
  places: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  horaSortida: {
    type: Number,
    required: true,
  },
  comentaris: {
    type: String,
  },
  dones: {
    type: Boolean,
    default: false,
  },
});

const Viatge = model("Viatge", ViatgeSchema, "viatges");

module.exports = Viatge;
