const { isValidObjectId } = require("mongoose");

const isValidid = (req, res, next) => {
  const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: `${id} is not valid id` });    
  }
  next();
};
module.exports = isValidid;