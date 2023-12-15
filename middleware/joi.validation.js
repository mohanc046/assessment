const { StatusCodes } = require('http-status-codes');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
  }
}

module.exports = validateRequest;