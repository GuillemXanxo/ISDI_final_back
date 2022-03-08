const Viatge = require("../../db/models/Viatge");

const getViatges = async (req, res) => {
  const series = await Viatge.find();
  res.json({ series });
};

module.exports = { getViatges };
