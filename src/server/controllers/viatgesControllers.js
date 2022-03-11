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

const deleteTrip = async (req, res, next) => {
  const { id } = req.params;
  try {
    const viatgeToDelete = await Viatge.findByIdAndDelete(id);
    if (viatgeToDelete) {
      res.json({});
    } else {
      const error = new Error("Could not find the Trip");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = { getViatgesCrono, getViatgesOrigen, deleteTrip };
