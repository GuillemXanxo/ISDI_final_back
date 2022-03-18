const Viatge = require("../../db/models/Viatge");

const getViatgesCrono = async (req, res) => {
  const viatges = await Viatge.find();
  res.json({ viatges });
};

const deleteViatge = async (req, res, next) => {
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

const createViatge = async (req, res, next) => {
  try {
    const toCreateViatge = req.body;
    toCreateViatge.horaSortidaNumber = toCreateViatge.horaSortida.replace(
      /:/g,
      ""
    );
    toCreateViatge.dataNumber = toCreateViatge.data.replace(/-/g, "");
    parseInt(toCreateViatge.horaSortidaNumber, 10);
    parseInt(toCreateViatge.dataNumber, 10);
    const createdViatge = await Viatge.create(toCreateViatge);
    res.status(201).json(createdViatge);
  } catch (error) {
    const newError = new Error("Viatge invàlid o incorrecte");
    newError.status = 400;
    next(newError);
  }
};

module.exports = { getViatgesCrono, deleteViatge, createViatge };
