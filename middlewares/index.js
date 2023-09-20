const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const emptyBody = require('./emptyBody');
const isValidid = require('./isValidid');
const auth = require('./auth');
const handleMongooseError = require('./handleMongooseError');

module.exports = {
    validation,
    ctrlWrapper,
    emptyBody,
    isValidid,
    auth,
    handleMongooseError,
};
