const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});