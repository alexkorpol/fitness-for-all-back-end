const { Exercise } = require("../../models");
const HttpError = require("../../helpers/HttpError");
const { Forbidden } = require("http-errors");

const getAllExercises = async (req, res) => {
  const { bodyPart, equipment, target } = req.query;

  if (JSON.stringify(req.user.bodyData) === "{}") {
    throw new Forbidden("bodyData absent in user collection");
  }

  const query = {};

  bodyPart && (query.bodyPart = bodyPart);
  equipment && (query.equipment = equipment);
  target && (query.target = target);

  const exercises = await Exercise.find(query);
  if (!exercises) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    exercises,
  });
};

module.exports = getAllExercises;
