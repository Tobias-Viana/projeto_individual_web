const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
});