const { Day } = require("../../models/diary");
const { HttpError, ctrlWrapper } = require("../../helpers");
const moment = require("moment");

const addProductToDay = async (req, res, next) => {
  const {
    date = moment().format("DD-MM-YYYY"),
    productId,
    amount,
    calories,
  } = req.body;
  const { _id: owner } = req.user;

  try {
    if (date) {
      const currentDate = moment().startOf("day");
      const inputDate = moment(date, "DD-MM-YYYY").startOf("day");
      if (
        !currentDate.isAfter(inputDate) &&
        !currentDate.isSame(inputDate, "day")
      ) {
        return res
          .status(400)
          .json({
            message: "Date has not yet arrived or not a suitable format",
          });
      }
    }

    let day = await Day.findOne({ date, owner });

    if (!day) {
      day = await Day.create({ date, owner, exercises: [], products: [] });
    }
    day.products.push({ productId, amount, calories });

    await day.save();

    res
      .status(201)
      .json({ message: `Product added to the day ${date}`, productId });
  } catch (error) {
    console.error(error);
    throw HttpError(500, "Error adding product to day");
  }
};

const removeProduct = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { productToRemove, date = moment().format("DD-MM-YYYY") } = req.body;

  const day = await Day.findOne({ date, owner });

  if (!day) {
    return res.status(404).json({ message: "Day not found" });
  }

  const productToDelete = day.products.find(
    (product) => product._id.toString() === productToRemove
  );

  if (!productToDelete) {
    return res.status(404).json({ message: "Product not found in the day" });
  }

  day.products.pull(productToDelete);

  await day.save();

  res.json({ message: "Product removed" });
};

module.exports = {
  addProductToDay: ctrlWrapper(addProductToDay),
  removeProduct: ctrlWrapper(removeProduct),
};
