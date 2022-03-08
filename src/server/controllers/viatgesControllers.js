const Viatge = require("../../db/models/Viatge");

const getViatges = async (req, res) => {
  const viatges = await Viatge.find();
  res.json({ viatges });
};

module.exports = { getViatges };
