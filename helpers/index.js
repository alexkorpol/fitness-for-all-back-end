const calculateLifeStyle = require('./calculateLifeStyle');
const ctrlWrapper = require('./ctrlWrapper');
const handleMongooseError = require('./handleMongooseError');
const HttpError = require('./HttpError');

module.exports = {
    ctrlWrapper,
    calculateLifeStyle,
    handleMongooseError,
    HttpError,
};
