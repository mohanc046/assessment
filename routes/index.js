
module.exports = app => {

    app.use('/v1/validator', require('../models/v1/passwordEntryChecker/routes'));

}