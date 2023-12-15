const Joi = require('joi');

module.exports.validationSchema = {
    CREATE_ENTRY: Joi.object({
        password: Joi.string().required(),
    })
}