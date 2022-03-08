const Viatge = require("../../db/models/Viatge");

const getViatgesCrono = async (req, res) => {
  const viatges = await Viatge.find();
  res.json({ viatges });
};

const getViatgesOrigen = async (req, res) => {
  const { origen } = req.params;
  const viatges = await Viatge.find();
  const viatgesOrigen = viatges.filter((viatge) => viatge.origen === origen);
  res.json({ viatgesOrigen });
};

module.exports = { getViatgesCrono, getViatgesOrigen };
