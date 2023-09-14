const { NotFound } = require("http-errors");

const {Contact} = require("../../models");


const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw new NotFound(`Not found contact with id=${id}`);
    }
   res.json(result);
}

module.exports = updateStatusContact;

